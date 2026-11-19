// One command, start to finish:  npm run demo:record
//
//   1. seed      demo data (visitor enquiry + Penny's open slots for the stand-in calendar)
//   2. build     a production build of the app into demo/.build (the repo's dist/ is untouched)
//   3. serve     vite preview on a free port (skipped if DEMO_URL points at a running app)
//   4. record    desktop 1920x1080 and phone 390x844 walkthroughs (record.ts)
//   5. post      trim, title card, H.264, loop, poster (postprocess.ts)
//
// Flags: `-- desktop` or `-- mobile` to do one variant; `-- --skip-record` to only re-run post.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { seed } from './seed.ts'
import { record, type Variant } from './record.ts'
import { postprocess } from './postprocess.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const args = process.argv.slice(2)
const only = args.filter((a): a is Variant => a === 'desktop' || a === 'mobile')
const variants: Variant[] = only.length ? only : ['desktop', 'mobile']
const started = Date.now()

// 1. seed
const data = seed()
mkdirSync(join(here, 'fixtures/generated'), { recursive: true })
writeFileSync(join(here, 'fixtures/generated/availability.json'), JSON.stringify(data, null, 2))
console.log(`seed: ${Object.keys(data.days).length} open days, demo books ${data.pick.date} at ${data.pick.time}`)

if (!args.includes('--skip-record')) {
  let url = process.env.DEMO_URL
  let server: { close(): Promise<void> } | undefined
  if (!url) {
    // 2-3. build and serve the real app (production build: no dev-server reloads mid-take)
    const { build, preview } = await import('vite')
    const outDir = 'demo/.build'
    console.log('build: vite build -> demo/.build')
    await build({ root, logLevel: 'warn', build: { outDir, emptyOutDir: true } })
    const p = await preview({ root, logLevel: 'warn', build: { outDir }, preview: { host: '127.0.0.1', port: 4319, strictPort: false, open: false } })
    url = (p.resolvedUrls?.local[0] ?? 'http://127.0.0.1:4319/').replace(/\/$/, '')
    server = p
    console.log(`serve: ${url}`)
  } else {
    console.log(`serve: using running app at ${url}`)
  }
  try {
    // 4. record
    await record(url, variants)
  } finally {
    await server?.close()
  }
}

// 5. post-process
await postprocess(variants)
console.log(`done in ${Math.round((Date.now() - started) / 1000)}s`)
