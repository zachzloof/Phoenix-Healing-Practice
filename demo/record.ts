// Records the Phoenix Healing Practice walkthrough with Playwright.
//
//   node demo/record.ts            records against DEMO_URL (default http://localhost:4319)
//   npm run demo:record            (from the repo root) seeds, builds, serves, records, post-processes
//
// Produces demo/raw/<variant>.webm plus demo/raw/<variant>.marks.json. The marks are
// timestamps (seconds from the start of the video) that postprocess.ts uses to trim
// and to cut the short loop, so nothing downstream depends on hard-coded times.
import { chromium, type Browser, type Locator, type Page } from 'playwright'
import { readFileSync, writeFileSync, mkdirSync, renameSync, rmSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const RAW = join(here, 'raw')

export type Variant = 'desktop' | 'mobile'
export type Mark = { name: string; t: number }

const VARIANTS: Record<Variant, { viewport: { width: number; height: number }; touch: boolean }> = {
  desktop: { viewport: { width: 1920, height: 1080 }, touch: false },
  // the site is mobile-first, so it gets its own phone-sized cut
  mobile: { viewport: { width: 390, height: 844 }, touch: true },
}

const visitor = JSON.parse(readFileSync(join(here, 'fixtures/visitor.json'), 'utf8'))

// ── pacing ───────────────────────────────────────────────────────────────
// Holds are deliberate pauses for the viewer (plus one still pre-roll that keeps the
// opening cut easy to detect). Nothing waits on the app with a timer: that is always a
// selector, URL or scroll state.
const BEAT = 1200 // the standard "take this in" pause after a key moment
const SHORT = 500

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

class Director {
  marks: Mark[] = []
  t0 = 0
  pos = { x: 0, y: 0 }
  page: Page
  touch: boolean
  constructor(page: Page, touch: boolean) {
    this.page = page
    this.touch = touch
  }

  mark(name: string) {
    const t = (Date.now() - this.t0) / 1000
    this.marks.push({ name, t })
    console.log(`  ${t.toFixed(2).padStart(6)}s  ${name}`)
  }

  hold(ms = BEAT) {
    return this.page.waitForTimeout(ms)
  }

  /**
   * Move the mouse along a gently curved, eased path. Time-based, so the glide
   * takes `ms` however long each mouse event takes to round-trip.
   */
  async glide(x: number, y: number, ms = 700) {
    const from = { ...this.pos }
    const dist = Math.hypot(x - from.x, y - from.y)
    if (dist < 2) return
    // bow the path slightly, the way a wrist moves
    const bow = Math.min(60, dist * 0.12)
    const nx = -(y - from.y) / dist
    const ny = (x - from.x) / dist
    const start = Date.now()
    for (;;) {
      const t = Math.min(1, (Date.now() - start) / ms)
      const p = ease(t)
      const arc = Math.sin(p * Math.PI) * bow
      await this.page.mouse.move(from.x + (x - from.x) * p + nx * arc, from.y + (y - from.y) * p + ny * arc)
      if (t >= 1) break
      await this.page.waitForTimeout(8)
    }
    this.pos = { x, y }
  }

  /** Put the cursor somewhere without an animated move (used before the video starts). */
  async park(x: number, y: number) {
    await this.page.mouse.move(x, y)
    this.pos = { x, y }
    // the desktop arrow is always on screen; a fingertip only shows near a tap
    if (!this.touch) await this.page.evaluate(([px, py]) => (window as any).__demoCursor?.place(px, py), [x, y])
  }

  /**
   * Wait until the page has stopped scrolling (smooth scroll, router hash jumps).
   * With `expectMove`, first give a scroll that hasn't started yet up to 1s to begin,
   * so we never mistake "not started" for "finished".
   */
  async settleScroll(expectMove = false) {
    await this.page.waitForFunction(
      (expectMove) =>
        new Promise<boolean>((done) => {
          const t0 = performance.now()
          let moved = !expectMove
          let last = scrollY
          let still = 0
          const tick = () => {
            if (scrollY === last) still++
            else (still = 0), (last = scrollY), (moved = true)
            const waited = performance.now() - t0 > 1000
            if (still >= 8 && (moved || waited)) done(true)
            else requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }),
      expectMove,
      { timeout: 10_000 },
    )
  }

  /** Smooth, eased scroll so an element sits at the centre (or top) of the view. */
  async scrollTo(target: Locator, block: 'center' | 'start' = 'center') {
    await target.waitFor({ state: 'visible' })
    const to = await target.evaluate((el, block) => {
      const nav = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const r = el.getBoundingClientRect()
      const top = r.top + scrollY
      const room = innerHeight - nav
      const y = block === 'start' || r.height > room ? top - nav - 16 : top - nav - (room - r.height) / 2
      return Math.max(0, Math.min(y, document.documentElement.scrollHeight - innerHeight))
    }, block)
    const from = await this.page.evaluate(() => scrollY)
    const ms = Math.min(1800, Math.max(700, 600 + Math.abs(to - from) * 0.45))
    await this.page.evaluate(
      ([from, to, ms]) =>
        new Promise<void>((done) => {
          const start = performance.now()
          const e = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / ms)
            window.scrollTo({ top: from + (to - from) * e(p), behavior: 'instant' })
            if (p < 1) requestAnimationFrame(step)
            else done()
          }
          requestAnimationFrame(step)
        }),
      [from, to, ms],
    )
    await this.settleScroll()
  }

  /** Scroll only if the element isn't comfortably on screen below the sticky nav. */
  async ensureVisible(target: Locator) {
    await target.waitFor({ state: 'visible' })
    const inView = await target.evaluate((el) => {
      const nav = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const r = el.getBoundingClientRect()
      return r.top >= nav + 8 && r.bottom <= innerHeight - 8
    })
    if (!inView) {
      await this.scrollTo(target)
      await this.hold(250)
    }
  }

  async pointAt(target: Locator, fx = 0.5, fy = 0.5) {
    await this.ensureVisible(target)
    const b = await target.boundingBox()
    if (!b) throw new Error(`no box for ${target}`)
    const x = b.x + b.width * fx
    const y = b.y + b.height * fy
    if (this.touch) {
      // a fingertip arrives from below, close to the target
      await this.park(Math.min(x + 40, 370), Math.min(y + 110, 830))
      await this.glide(x, y, 380)
    } else {
      await this.glide(x, y, 650 + Math.min(500, Math.hypot(x - this.pos.x, y - this.pos.y) * 0.35))
    }
    return { b, x, y }
  }

  /** Glide to the element, then click it with a real (actionable) Playwright click. */
  async click(target: Locator, fx = 0.5, fy = 0.5) {
    const { b, x, y } = await this.pointAt(target, fx, fy)
    await this.hold(140)
    await target.click({ position: { x: x - b.x, y: y - b.y } })
  }

  async type(target: Locator, text: string, delay = 55) {
    await this.click(target, 0.25, 0.5)
    await target.pressSequentially(text, { delay })
  }

  /** Native <select> popups never appear in headless video: point, ripple, then choose. */
  async choose(target: Locator, value: string) {
    const { x, y } = await this.pointAt(target, 0.3, 0.5)
    await this.hold(140)
    await this.page.evaluate(([px, py]) => (window as any).__demoCursor?.ripple(px, py), [x, y])
    await target.focus()
    await target.selectOption(value)
  }

  /** The page is fully drawn: no pending requests, real fonts, two painted frames. */
  async ready() {
    await this.page.waitForLoadState('networkidle')
    await this.page.evaluate(() => document.fonts.ready)
    const ok = await this.page.evaluate(
      () => document.fonts.check('48px Caprasimo') && document.fonts.check('16px "Alegreya Sans"'),
    )
    if (!ok) throw new Error('Site fonts did not load; refusing to record in fallback fonts')
    await this.page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  }

  async arrive(path: string, heading: string) {
    await this.page.waitForURL((u) => u.pathname === path)
    await this.page.locator('h1#hero-title', { hasText: heading }).waitFor()
    await this.settleScroll()
    await this.ready()
  }
}

// ── the hero flow ────────────────────────────────────────────────────────
async function flow(d: Director, availability: { pick: { date: string; time: string } }) {
  const { page, touch } = d
  const hero = page.locator('section.hero')

  // 1. Home: the rose window catches fire
  d.mark('hero')
  await d.hold(touch ? 2400 : 1600)

  // 2. Firelight follows the cursor across the window (desktop only; touch has no hover)
  if (!touch) {
    const rose = await hero.locator('.rose').boundingBox()
    if (!rose) throw new Error('rose window not found')
    const at = (fx: number, fy: number) => [rose.x + rose.width * fx, rose.y + rose.height * fy] as const
    d.mark('firelight')
    await d.glide(...at(0.3, 0.3), 1100)
    await d.glide(...at(0.78, 0.42), 1300)
    await d.glide(...at(0.55, 0.8), 1200)
    await d.hold(SHORT)
  }

  // 3. Explore the services: two elemental windows side by side
  await d.click(hero.getByRole('link', { name: 'Explore the services' }))
  await page.waitForURL((u) => u.hash === '#services')
  await d.settleScroll(true)
  // frame both windows (phone: the first one) rather than where the router's offset lands
  await d.scrollTo(touch ? page.locator('#services article').first() : page.locator('#services .pair'), 'center')
  d.mark('services')
  await d.hold(BEAT)

  // 4. Step through the earth window: Myofascial Release
  if (!touch) {
    const air = page.locator('#services a.window-cell[href="/shamanic-healing"]')
    await d.pointAt(air, 0.5, 0.45)
    await d.hold(700)
  }
  await d.click(page.locator('#services a.window-cell[href="/myofascial-release"]'), 0.5, 0.45)
  await d.arrive('/myofascial-release', 'Myofascial Release')
  d.mark('mfr')
  if (!touch) {
    const rose = await page.locator('section.hero .rose').boundingBox()
    if (rose) await d.glide(rose.x + rose.width * 0.62, rose.y + rose.height * 0.35, 1300)
  }
  await d.hold(BEAT)

  await d.scrollTo(page.locator('.ideal'), 'center')
  d.mark('mfr-ideal')
  await d.hold(BEAT + 300)

  // 5. Or step through the wind window: Shamanic Healing
  const other = page.locator('a.other-window')
  await d.scrollTo(page.locator('section:has(> .other)'), 'center')
  await d.hold(SHORT)
  await d.click(other, 0.5, 0.5)
  await d.arrive('/shamanic-healing', 'Shamanic Healing')
  d.mark('shamanic')
  if (!touch) {
    const rose = await page.locator('section.hero .rose').boundingBox()
    if (rose) await d.glide(rose.x + rose.width * 0.4, rose.y + rose.height * 0.4, 1300)
  }
  await d.hold(BEAT)

  // 6. Ask Penny a question (phone: through the menu)
  if (touch) {
    await d.click(page.locator('header button.menu'))
    await page.locator('#mobile-menu').waitFor({ state: 'visible' })
    await d.hold(800)
    await d.click(page.locator('#mobile-menu a', { hasText: 'Contact' }))
  } else {
    await d.click(page.getByRole('link', { name: 'Ask Penny a question' }))
  }
  d.mark('hop') // postprocess.ts splices out the router's brief flash of the home hero here
  await page.waitForURL((u) => u.pathname === '/' && u.hash === '#contact')
  await page.locator('#contact form').waitFor()
  await d.settleScroll(true)
  await d.ready()
  await d.scrollTo(page.locator(touch ? '#contact .form-pane' : '#contact .grid'), touch ? 'start' : 'center')
  d.mark('contact')
  await d.hold(800)

  // 7. A real-feeling enquiry, typed at a human pace
  const form = page.locator('#contact form')
  await d.type(form.locator('input[name="name"]'), visitor.name, 70)
  await d.type(form.locator('input[name="email"]'), visitor.email, 45)
  await d.type(form.locator('input[name="phone"]'), visitor.phone, 55)
  await d.choose(form.locator('select[name="service"]'), visitor.service)
  await d.hold(400)
  await d.type(form.locator('textarea[name="message"]'), visitor.message, 24)
  await d.hold(700)

  // 8. Send: "Sending…" then "Message sent"
  await d.click(form.locator('button.send'))
  await page.locator('#contact button.send', { hasText: 'Sending' }).waitFor({ timeout: 3000 }).catch(() => {})
  await page.locator('#contact .sent').waitFor()
  await d.ensureVisible(page.locator('#contact .sent'))
  d.mark('sent')
  await d.hold(BEAT + 300)

  // 9. Book a session: pick a day and a time in the (stand-in) calendar
  await d.click(page.locator('header a.book'))
  await page.waitForURL((u) => u.hash === '#booking')
  await d.settleScroll(true)
  const cal = page.locator('[data-demo-cal]')
  await cal.waitFor()
  await d.scrollTo(page.locator('#booking .frame'), touch ? 'start' : 'center')
  d.mark('booking')
  await d.hold(900)

  await d.click(cal.locator(`button[data-date="${availability.pick.date}"]`))
  await cal.locator('.dc-slot').first().waitFor()
  await d.hold(900)
  await d.click(cal.locator(`button[data-time="${availability.pick.time}"]`))
  await d.hold(500)
  await d.click(cal.locator('[data-confirm]'))
  await page.locator('[data-demo-booked]').waitFor()
  d.mark('booked')
  await d.hold(BEAT + 1800)
  d.mark('end')
}

export async function recordVariant(browser: Browser, variant: Variant, baseURL: string, availability: any) {
  const v = VARIANTS[variant]
  const tmp = join(RAW, `.tmp-${variant}`)
  rmSync(tmp, { recursive: true, force: true })

  const ctx = await browser.newContext({
    viewport: v.viewport,
    deviceScaleFactor: 1,
    isMobile: v.touch,
    hasTouch: v.touch,
    locale: 'en-GB',
    timezoneId: 'Europe/London',
    reducedMotion: 'no-preference',
    recordVideo: { dir: tmp, size: v.viewport, fps: 30 },
  })
  await ctx.addInitScript(
    `window.__DEMO_CURSOR_MODE__ = ${JSON.stringify(v.touch ? 'touch' : 'arrow')};` +
      `window.__DEMO_AVAILABILITY__ = ${JSON.stringify(availability)};`,
  )
  await ctx.addInitScript({ path: join(here, 'fixtures/cursor.js') })

  // Booking stand-in: answer Calendly's widget.js with the demo calendar, block the rest
  const widget = readFileSync(join(here, 'fixtures/calendar-widget.js'), 'utf8')
  await ctx.route(/^https:\/\/([a-z0-9-]+\.)?calendly\.com\//, (route) =>
    route.request().url().endsWith('/widget.js')
      ? route.fulfill({ status: 200, contentType: 'application/javascript', body: widget })
      : route.abort(),
  )

  const page = await ctx.newPage()
  const d = new Director(page, v.touch)
  d.t0 = Date.now() // the video starts with the page

  // Warm-up (trimmed away): load every page once so chunks, fonts and images are cached
  for (const [path, h] of [
    ['/', 'Phoenix Healing Practice'],
    ['/shamanic-healing', 'Shamanic Healing'],
    ['/myofascial-release', 'Myofascial Release'],
  ]) {
    await page.goto(baseURL + path)
    await page.locator('h1#hero-title', { hasText: h }).waitFor()
    await d.ready()
  }

  // Start: an in-app hop back home so the hero mounts fully drawn (no blank frame,
  // no loading flash) and its ignite animation plays from the top, on camera.
  if (!v.touch) await d.park(1500, 760)
  // a still moment before the cut, so the warm-up's own page changes sit well clear of
  // the opening cut that postprocess.ts detects
  await d.hold(1500)
  await page.evaluate(() => (document.querySelector('header a.brand') as HTMLElement).click())
  await page.locator('h1#hero-title', { hasText: 'Phoenix Healing Practice' }).waitFor()
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  d.mark('start')

  await flow(d, availability)

  const video = page.video()
  await ctx.close() // finalises the video file
  const src = await video!.path()
  mkdirSync(RAW, { recursive: true })
  const out = join(RAW, `${variant}.webm`)
  rmSync(out, { force: true })
  renameSync(src, out)
  rmSync(tmp, { recursive: true, force: true })
  writeFileSync(join(RAW, `${variant}.marks.json`), JSON.stringify(d.marks, null, 2))
  return { video: out, marks: d.marks }
}

export async function record(baseURL: string, variants: Variant[] = ['desktop', 'mobile']) {
  const availPath = join(here, 'fixtures/generated/availability.json')
  if (!existsSync(availPath)) throw new Error('No demo availability; run `node demo/seed.ts` first')
  const availability = JSON.parse(readFileSync(availPath, 'utf8'))
  // Headless Chromium renders with SwiftShader (CPU) by default, which manages ~15fps on
  // this SVG-heavy site and makes the video judder. Ask for the real GPU instead; if
  // there isn't one Chromium quietly falls back. DEMO_NO_GPU=1 turns this off.
  const gpu = process.env.DEMO_NO_GPU
    ? []
    : ['--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', ...(process.platform === 'win32' ? ['--use-angle=d3d11'] : [])]
  const browser = await chromium.launch({ args: gpu })
  const probe = await browser.newPage()
  const renderer = await probe.evaluate(() => {
    const gl = document.createElement('canvas').getContext('webgl')
    const info = gl?.getExtension('WEBGL_debug_renderer_info')
    return info ? String(gl!.getParameter(info.UNMASKED_RENDERER_WEBGL)) : 'unknown'
  })
  await probe.close()
  console.log(`record: renderer ${renderer}`)
  if (/swiftshader/i.test(renderer)) console.warn('record: WARNING software rendering; animations may look choppy')
  try {
    const results: Record<string, { video: string; marks: Mark[] }> = {}
    for (const v of variants) {
      console.log(`record: ${v}`)
      results[v] = await recordVariant(browser, v, baseURL, availability)
    }
    return results
  } finally {
    await browser.close()
  }
}

const isMain = process.argv[1] && resolve(fileURLToPath(import.meta.url)).toLowerCase() === resolve(process.argv[1]).toLowerCase()
if (isMain) {
  const only = process.argv.slice(2).filter((a): a is Variant => a === 'desktop' || a === 'mobile')
  await record(process.env.DEMO_URL || 'http://localhost:4319', only.length ? only : undefined)
}
