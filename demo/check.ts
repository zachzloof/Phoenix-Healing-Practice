// Self-check: pull frames out of the finished videos so a human (or Claude) can look at them.
//
//   node demo/check.ts [everySeconds=3]
//
// Writes demo/frames/<video>/t###.#.jpg every N seconds, plus one frame at each
// recorded mark (named after the mark), plus the first and last frame.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { probe } from './postprocess.ts'

const here = dirname(fileURLToPath(import.meta.url))
const every = Number(process.argv[2] || 3)

function grab(file: string, t: number, out: string) {
  spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', t.toFixed(3), '-i', file, '-frames:v', '1', '-q:v', '3', out])
}

for (const name of ['desktop', 'mobile', 'loop']) {
  const file = join(here, 'output', `phoenix-healing-${name}.mp4`)
  if (!existsSync(file)) continue
  const dir = join(here, 'frames', name)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  const { duration } = probe(file)
  for (let t = 0; t < duration; t += every) grab(file, t, join(dir, `t${t.toFixed(1).padStart(5, '0')}.jpg`))
  grab(file, Math.max(0, duration - 0.05), join(dir, 'zz-last.jpg'))
  if (name !== 'loop') {
    const marks = JSON.parse(readFileSync(join(here, 'raw', `${name}.output-marks.json`), 'utf8'))
    for (const m of marks) {
      const t = m.t
      if (t >= 0 && t < duration) grab(file, t + 0.3, join(dir, `m-${t.toFixed(1).padStart(5, '0')}-${m.name}.jpg`))
    }
  }
  console.log(`${name}: ${duration.toFixed(1)}s -> ${dir}`)
}
