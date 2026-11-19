// Turns the raw Playwright recordings into finished videos in demo/output/.
//
//   phoenix-healing-desktop.mp4   1920x1080, 3s title card, trimmed, H.264
//   phoenix-healing-mobile.mp4    390x844,   3s title card, trimmed, H.264
//   phoenix-healing-loop.mp4      1280x720, ~15s, muted, seamless loop for a portfolio grid
//   phoenix-healing-poster.jpg    a still for the grid before the loop plays
//
// All cut points come from demo/raw/<variant>.marks.json written by record.ts.
import { chromium } from 'playwright'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Mark, Variant } from './record.ts'

const here = dirname(fileURLToPath(import.meta.url))
const RAW = join(here, 'raw')
const OUT = join(here, 'output')

const CARD_SECONDS = 3
const CROSSFADE = 0.25 // card -> site; short, so the window's ignite isn't hidden
const HOP_DISSOLVE = 0.4
const FADE_OUT = 0.6
const FPS = 30
const FRAME = 1 / FPS

const SIZES: Record<Variant, { w: number; h: number }> = {
  desktop: { w: 1920, h: 1080 },
  mobile: { w: 390, h: 844 },
}

function ffmpeg(args: string[]) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
  if (r.error) throw new Error(`ffmpeg not found on PATH (${r.error.message}). Install it, e.g. winget install Gyan.FFmpeg`)
  if (r.status !== 0) throw new Error(`ffmpeg failed: ffmpeg ${args.join(' ')}`)
}

export function probe(file: string) {
  const r = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration:stream=codec_name,width,height,r_frame_rate', '-of', 'json', file],
    { encoding: 'utf8' },
  )
  if (r.status !== 0) throw new Error(`ffprobe failed on ${file}`)
  const j = JSON.parse(r.stdout)
  const v = j.streams.find((s: any) => s.width)
  return { duration: Number(j.format.duration), codec: v?.codec_name, width: v?.width, height: v?.height, fps: v?.r_frame_rate, audio: j.streams.length > 1 }
}

/**
 * Marks are wall-clock times; the video's own clock starts a little later (by
 * ~0.5-0.8s, varying run to run). Find the true cut by locating the hard cut where
 * the warm-up page switches to the home hero: the biggest scene change in the
 * 1.3s before the "start" mark. Returns marks shifted onto the video's clock, with
 * "start" moved to the first fully drawn home frame.
 */
/** Per-frame scene-change scores for a stretch of a raw recording (times in video seconds). */
function sceneScores(variant: Variant, from: number, dur: number) {
  from = Math.max(0, from)
  const r = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-ss', from.toFixed(3), '-t', dur.toFixed(3), '-i', join(RAW, `${variant}.webm`), '-vf', "select='gte(scene,0)',metadata=print:key=lavfi.scene_score", '-f', 'null', '-'],
    { encoding: 'utf8' },
  )
  const out: { t: number; score: number }[] = []
  let pts = NaN
  for (const line of (r.stderr || '').split('\n')) {
    const m = line.match(/pts_time:([\d.]+)/)
    if (m) pts = Number(m[1])
    const s = line.match(/lavfi\.scene_score=([\d.]+)/)
    if (s) out.push({ t: from + pts, score: Number(s[1]) })
  }
  return out
}

export function syncedMarks(variant: Variant): Mark[] {
  const raw: Mark[] = JSON.parse(readFileSync(join(RAW, `${variant}.marks.json`), 'utf8'))
  const st = raw.find((m) => m.name === 'start')!.t
  const best = sceneScores(variant, st - 1.3, 1.4).reduce((a, b) => (b.score > a.score ? b : a), { t: NaN, score: 0 })
  // the scene score belongs to the first frame of the new scene
  const cut = best.score > 0.05 ? best.t + FRAME : st - 0.6
  const lag = st - cut
  if (best.score <= 0.05) console.warn(`post: ${variant}: no clear opening cut found, assuming 0.6s lag`)
  else console.log(`post: ${variant}: video clock lags marks by ${lag.toFixed(2)}s (cut score ${best.score.toFixed(2)})`)
  return raw.map((m) => ({ name: m.name, t: Math.max(0, m.t - lag) }))
}

const synced = new Map<Variant, Mark[]>()
const marksOf = (variant: Variant): Mark[] => {
  if (!synced.has(variant)) {
    const m = syncedMarks(variant)
    writeFileSync(join(RAW, `${variant}.synced.json`), JSON.stringify(m, null, 2))
    synced.set(variant, m)
  }
  return synced.get(variant)!
}
const at = (marks: Mark[], name: string) => {
  const m = marks.find((x) => x.name === name)
  if (!m) throw new Error(`mark "${name}" missing`)
  return m.t
}

async function renderCards() {
  const browser = await chromium.launch()
  try {
    for (const [variant, { w, h }] of Object.entries(SIZES)) {
      const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
      await page.goto(pathToFileURL(join(here, 'title-card.html')).href, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      if (!(await page.evaluate(() => document.fonts.check('48px Caprasimo')))) throw new Error('title card: Caprasimo did not load')
      await page.screenshot({ path: join(RAW, `card-${variant}.png`) })
      await page.close()
    }
  } finally {
    await browser.close()
  }
}

/**
 * "Ask Penny a question" crosses pages to /#contact. The app's router mounts the home
 * hero at the top, waits 420ms, then jumps to the form, so the raw take flashes the
 * fire hero for about half a second. Find the two hard cuts (service page -> hero,
 * hero -> form) after the "hop" mark, so the flash can be spliced out.
 */
function findHop(variant: Variant, marks: Mark[]) {
  const hop = at(marks, 'hop')
  const cuts = sceneScores(variant, hop - 0.2, 1.8)
    .filter((s) => s.score > 0.08)
    .sort((a, b) => b.score - a.score)
  const a = cuts[0]
  const b = a && cuts.find((c) => Math.abs(c.t - a.t) > 0.2)
  if (!a || !b) {
    console.warn(`post: ${variant}: could not find the contact hop; leaving it unspliced`)
    return null
  }
  const [first, second] = [a, b].sort((x, y) => x.t - y.t)
  // keep up to the last frame of the service page, resume on the first frame of the form
  return { cutOut: first.t, resume: second.t }
}

function fullVideo(variant: Variant) {
  const { w, h } = SIZES[variant]
  const marks = marksOf(variant)
  const start = at(marks, 'start')
  const end = at(marks, 'end')
  const hop = findHop(variant, marks)
  const out = join(OUT, `phoenix-healing-${variant}.mp4`)
  const frame = `fps=${FPS},scale=${w}:${h}:flags=lanczos,setsar=1,format=yuv420p`

  // site timeline: [start, cutOut) dissolves into [resume, end)
  let site: string
  let siteLen: number
  let toOut: (t: number) => number
  if (hop) {
    const partA = hop.cutOut - start
    site =
      `[1:v]${frame},setpts=PTS-STARTPTS,split[pa][pb];` +
      `[pa]trim=end=${partA.toFixed(3)},setpts=PTS-STARTPTS[a];` +
      `[pb]trim=start=${(hop.resume - start).toFixed(3)},setpts=PTS-STARTPTS[b];` +
      `[a][b]xfade=transition=fade:duration=${HOP_DISSOLVE}:offset=${(partA - HOP_DISSOLVE).toFixed(3)}[site];`
    siteLen = partA - HOP_DISSOLVE + (end - hop.resume)
    toOut = (t) => CARD_SECONDS + (t < hop.cutOut ? t - start : partA - HOP_DISSOLVE + (t - hop.resume))
    console.log(`post: ${variant}: spliced out a ${(hop.resume - hop.cutOut).toFixed(2)}s router flash before the contact form`)
  } else {
    site = `[1:v]${frame},setpts=PTS-STARTPTS[site];`
    siteLen = end - start
    toOut = (t) => CARD_SECONDS + (t - start)
  }
  // where each step lands in the finished video (used by check.ts)
  writeFileSync(join(RAW, `${variant}.output-marks.json`), JSON.stringify(marks.map((m) => ({ name: m.name, t: toOut(m.t) })), null, 2))

  const total = CARD_SECONDS + siteLen
  ffmpeg([
    '-loop', '1', '-framerate', String(FPS), '-t', String(CARD_SECONDS + CROSSFADE), '-i', join(RAW, `card-${variant}.png`),
    '-ss', start.toFixed(3), '-t', (end - start).toFixed(3), '-i', join(RAW, `${variant}.webm`),
    '-filter_complex',
    `[0:v]${frame}[card];` +
      site +
      `[card][site]xfade=transition=fade:duration=${CROSSFADE}:offset=${CARD_SECONDS}[x];` +
      `[x]fade=t=out:st=${(total - FADE_OUT).toFixed(3)}:d=${FADE_OUT}[v]`,
    '-map', '[v]', '-an',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    out,
  ])
  return out
}

/** ~15s muted loop whose last second dissolves into its first, so it loops seamlessly. */
function loopVideo() {
  const marks = marksOf('desktop')
  const from = at(marks, 'start')
  // end just after we step into the earth window: fire hero -> windows -> earth hero,
  // which dissolves back into the fire hero nicely
  const len = Math.min(16, Math.max(12, at(marks, 'mfr') + 1.6 - from))
  const out = join(OUT, 'phoenix-healing-loop.mp4')
  ffmpeg([
    '-ss', from.toFixed(3), '-t', (len + 1).toFixed(3), '-i', join(RAW, 'desktop.webm'),
    '-filter_complex',
    `[0:v]fps=${FPS},scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,split[a][b];` +
      `[a]trim=start=1,setpts=PTS-STARTPTS[body];` +
      `[b]trim=end=1,setpts=PTS-STARTPTS[head];` +
      `[body][head]xfade=transition=fade:duration=1:offset=${(len - 1).toFixed(3)}[v]`,
    '-map', '[v]', '-an',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    out,
  ])
  return out
}

function poster() {
  const marks = marksOf('desktop')
  const t = at(marks, 'firelight') + 1.6
  const out = join(OUT, 'phoenix-healing-poster.jpg')
  ffmpeg(['-ss', t.toFixed(3), '-i', join(RAW, 'desktop.webm'), '-frames:v', '1', '-vf', 'scale=1280:720:flags=lanczos', '-q:v', '2', out])
  return out
}

export async function postprocess(variants: Variant[] = ['desktop', 'mobile']) {
  mkdirSync(OUT, { recursive: true })
  for (const v of variants) if (!existsSync(join(RAW, `${v}.webm`))) throw new Error(`missing raw/${v}.webm; record first`)
  console.log('post: title cards')
  await renderCards()
  const outputs: string[] = []
  for (const v of variants) {
    console.log(`post: ${v}`)
    outputs.push(fullVideo(v))
  }
  if (variants.includes('desktop')) {
    console.log('post: loop + poster')
    outputs.push(loopVideo(), poster())
  }
  for (const f of outputs) {
    if (f.endsWith('.jpg')) {
      console.log(`  ${f}`)
      continue
    }
    const p = probe(f)
    console.log(`  ${f}  ${p.width}x${p.height} ${p.codec} ${p.fps}fps  ${p.duration.toFixed(1)}s${p.audio ? '  (has audio!)' : ''}`)
  }
  return outputs
}

const isMain = process.argv[1] && resolve(fileURLToPath(import.meta.url)).toLowerCase() === resolve(process.argv[1]).toLowerCase()
if (isMain) await postprocess()
