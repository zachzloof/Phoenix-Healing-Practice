// Rose-window builder. One radial law for every window:
// seeded border ring → bead ring → leaf wreath → medallion with the element's figure.
// The chakra jewels always run up the figure's spine, root at the bottom, crown at the top.
import {
  rng, sector, blade, flameTongue, smoothClosed, smoothOpen, cutPath,
  jitter, pick, PALETTES, CHAKRAS,
} from './glass.js'

const C = 500
const TAU = Math.PI * 2

export function buildRose(element = 'fire', seed = 7) {
  const r = rng(seed)
  const P = PALETTES[element]
  const ring = []      // panes outside the medallion
  const med = []       // panes inside the medallion (clipped)
  const leads = []     // extra lead lines (veins, roots, curls)
  const jewels = []    // chakra cabochons + border nuggets

  // ── border ring 440–488, 32 panes alternating coloured and seeded clear
  const N = 32
  for (let i = 0; i < N; i++) {
    const a1 = (i / N) * TAU - Math.PI / 2
    const a2 = ((i + 1) / N) * TAU - Math.PI / 2
    const fill = i % 2 ? jitter(pick(P.clear, r), r, 0.04) : jitter(pick(P.border, r), r)
    ring.push({ d: sector(C, C, 440, 488, a1, a2, r, 2.5, 4), fill })
    if (i % 4 === 1) {
      const a = (a1 + a2) / 2
      jewels.push({ cx: C + 464 * Math.cos(a), cy: C + 464 * Math.sin(a), r: 11, color: pick(P.bright, r), nugget: true })
    }
  }

  // ── leaf wreath 330–440: dark glass sectors with tangential leaves laid over
  const W = 16
  for (let i = 0; i < W; i++) {
    const a1 = (i / W) * TAU
    const a2 = ((i + 1) / W) * TAU
    ring.push({ d: sector(C, C, 328, 440, a1, a2, r, 3, 5), fill: jitter(pick(P.deep, r), r) })
  }
  const L = 22
  for (let i = 0; i < L; i++) {
    const a = (i / L) * TAU + 0.12
    const rr = 384 + (i % 2 ? 14 : -14)
    const x = C + rr * Math.cos(a)
    const y = C + rr * Math.sin(a)
    const tilt = i % 2 ? 0.35 : -0.35
    const b = blade(x - 59 * Math.cos(a + Math.PI / 2 + tilt), y - 59 * Math.sin(a + Math.PI / 2 + tilt),
      a + Math.PI / 2 + tilt, 118, 34, r, { curl: i % 2 ? 0.5 : -0.5 })
    ring.push({ d: b.d, fill: jitter(pick(P.leaf, r), r) })
    leads.push({ d: b.vein, w: 3 })
  }

  // ── bead ring 308–328
  const Bn = 28
  for (let i = 0; i < Bn; i++) {
    const a1 = (i / Bn) * TAU
    const a2 = ((i + 1) / Bn) * TAU
    ring.push({ d: sector(C, C, 308, 328, a1, a2, r, 1.5, 3), fill: jitter(i % 2 ? pick(P.pale, r) : pick(P.bright, r), r) })
  }

  // ── medallion background
  med.push({ d: `M${C - 320},${C - 320}H${C + 320}V${C + 320}H${C - 320}Z`, fill: P.deep[0] })

  if (element === 'fire') firePhoenix(r, P, med, leads, jewels)
  if (element === 'earth') earthTree(r, P, med, leads, jewels)
  if (element === 'air') windFeather(r, P, med, leads, jewels)

  return { ring, med, leads, jewels }
}

function chakraSpine(points, jewels, size = 10) {
  points.forEach(([cx, cy], i) => jewels.push({ cx, cy, r: size, color: CHAKRAS[i].color, chakra: CHAKRAS[i].name }))
}

// ── FIRE: a phoenix rising out of three rows of flame ──────────────────────
function firePhoenix(r, P, med, leads, jewels) {
  // back to front flame rows
  const rows = [
    { n: 7, base: 830, w: 120, h: [380, 500], cols: P.deep.concat(P.flame.slice(0, 1)) },
    { n: 6, base: 840, w: 110, h: [260, 360], cols: P.flame },
    { n: 7, base: 850, w: 90, h: [130, 210], cols: P.bright },
  ]
  rows.forEach((row, k) => {
    for (let i = 0; i < row.n; i++) {
      const x = 190 + ((620 / (row.n - 1)) * i) + (k % 2 ? 30 : 0) + (r() - 0.5) * 20
      const h = row.h[0] + r() * (row.h[1] - row.h[0])
      med.push({ d: flameTongue(x, row.base, row.w, h, r, (r() - 0.5) * 50), fill: jitter(pick(row.cols, r), r) })
    }
  })

  // wings: each a fan of feather panes cut from one pivot at the shoulder,
  // with a tier of covert panes over the root, so no glass overlaps
  for (const side of [1, -1]) {
    const px = C + 34 * side
    const py = 452
    const n = 8
    const a0 = 0.32
    const a1 = -1.5
    const at = (k) => a0 + ((a1 - a0) * k) / n
    const pt = (rad, a) => [px + Math.cos(a) * rad * side, py + Math.sin(a) * rad]
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n
      const R = 152 + 74 * Math.sin(Math.PI * t)
      const aa = at(i)
      const ab = at(i + 1)
      const am = (aa + ab) / 2
      const w = () => (r() - 0.5) * 6
      const pts = [pt(44, aa), pt(R + w(), aa), pt(R + 30, am), pt(R + w(), ab), pt(44, ab)]
      med.push({ d: cutPath(pts), fill: jitter(i < 2 ? P.flame[1] : i < 4 ? P.flame[2] : i < 6 ? P.bright[1] : P.pale[0], r) })
      leads.push({ d: smoothOpen([pt(120, am + 0.02 * side), pt(R * 0.75, am), pt(R + 18, am)]), w: 2.5 })
    }
    for (let i = 0; i < 4; i++) {
      const aa = at(i * 2)
      const ab = at(i * 2 + 2)
      const am = (aa + ab) / 2
      const pts = [pt(40, aa), pt(108, aa), pt(124, am), pt(108, ab), pt(40, ab)]
      med.push({ d: cutPath(pts), fill: jitter(i % 2 ? P.deep[2] : P.flame[0], r) })
    }
  }

  // tail flames
  const tail = [0, 0.34, -0.34, 0.68, -0.68]
  tail.forEach((o, i) => {
    const b = blade(C, 602, Math.PI / 2 + o, 175 - i * 12, 24, r, { curl: o > 0 ? 0.8 : -0.8 })
    med.push({ d: b.d, fill: jitter(i === 0 ? P.bright[2] : i < 3 ? pick(P.flame, r) : pick(P.deep, r), r) })
    leads.push({ d: b.vein, w: 3 })
  })

  // body, split by lead into breast panes
  med.push({
    d: smoothClosed([[C, 370], [C + 40, 418], [C + 54, 494], [C + 36, 568], [C, 616], [C - 36, 568], [C - 54, 494], [C - 40, 418]]),
    fill: P.bright[0],
  })
  for (const y of [430, 470, 512, 552, 586]) {
    const hw = y < 470 ? 42 : y > 560 ? 30 : 52
    leads.push({ d: smoothOpen([[C - hw, y], [C, y + 7], [C + hw, y]]), w: 3.5 })
  }

  // head in profile, crest, beak
  for (let i = 0; i < 3; i++) {
    const b = blade(C + 4, 318, -Math.PI / 2 - 0.42 + i * 0.42, [52, 70, 52][i], 11, r, { curl: 0.5 })
    med.push({ d: b.d, fill: jitter(P.bright[2], r) })
  }
  med.push({ d: smoothClosed([[C, 312], [C + 26, 326], [C + 30, 356], [C + 14, 380], [C - 14, 378], [C - 24, 352], [C - 18, 324]]), fill: P.flame[2] })
  med.push({ d: cutPath([[C - 20, 334], [C - 56, 350], [C - 20, 356]]), fill: P.pale[0] })

  chakraSpine([[C, 596], [C, 562], [C, 528], [C, 492], [C, 452], [C - 2, 344], [C + 4, 270]], jewels)
}

// ── EARTH: a tree whose roots knit into a fascia-like web ─────────────────
function earthTree(r, P, med, leads, jewels) {
  // sky, low sun, hills, soil
  med.push({ d: `M150,150H850V600H150Z`, fill: P.pale[0] })
  med.push({ d: smoothClosed(Array.from({ length: 12 }, (_, i) => [640 + 58 * Math.cos((i / 12) * TAU), 300 + 58 * Math.sin((i / 12) * TAU)])), fill: P.bright[1] })
  const bands = [
    { y: 560, amp: 34, col: P.leaf[2] },
    { y: 612, amp: 26, col: P.leaf[0] },
    { y: 664, amp: 22, col: P.bright[2] },
    { y: 712, amp: 14, col: P.flame[0] },
    { y: 766, amp: 12, col: P.deep[1] },
  ]
  bands.forEach((b, k) => {
    const top = []
    for (let x = 150; x <= 850; x += 70) top.push([x, b.y + Math.sin(x / 90 + k * 1.7) * b.amp + (r() - 0.5) * 8])
    med.push({ d: cutPath([...top, [850, 860], [150, 860]]), fill: jitter(b.col, r) })
  })

  // roots: branching lead lines that cross-link into a web
  const roots = []
  for (let i = 0; i < 7; i++) {
    const ang = Math.PI * (0.18 + (i / 6) * 0.64)
    const pts = [[C, 700]]
    for (let s = 1; s <= 4; s++) pts.push([C + Math.cos(ang) * s * 70 + (r() - 0.5) * 24, 700 + Math.sin(ang) * s * 34 + (r() - 0.5) * 12])
    roots.push(pts)
    leads.push({ d: smoothOpen(pts), w: 4 })
  }
  for (let i = 0; i < roots.length - 1; i++) {
    for (const s of [2, 3]) leads.push({ d: smoothOpen([roots[i][s], [(roots[i][s][0] + roots[i + 1][s][0]) / 2, (roots[i][s][1] + roots[i + 1][s][1]) / 2 + 10], roots[i + 1][s]]), w: 2.5 })
  }

  // trunk and boughs
  med.push({ d: smoothClosed([[C - 26, 706], [C - 14, 600], [C - 18, 470], [C - 8, 420], [C + 10, 420], [C + 18, 470], [C + 16, 600], [C + 28, 706]]), fill: P.deep[2] })
  for (const [ang, len] of [[-2.2, 120], [-0.95, 120], [-2.6, 90], [-0.55, 90]]) {
    const b = blade(C, 470, ang, len, 14, r)
    med.push({ d: b.d, fill: P.deep[0] })
  }

  // canopy: a leafy cloud, leaves scattered through an oval crown
  med.push({ d: smoothClosed(Array.from({ length: 14 }, (_, i) => [C + 150 * Math.cos((i / 14) * TAU) + (r() - 0.5) * 18, 352 + 108 * Math.sin((i / 14) * TAU) + (r() - 0.5) * 18])), fill: P.leaf[3] })
  for (let i = 0; i < 46; i++) {
    const rad = Math.sqrt((i + 0.5) / 46)
    const th = i * 2.39996
    const x = C + Math.cos(th) * rad * 138
    const y = 352 + Math.sin(th) * rad * 98
    const out = Math.atan2(y - 352, x - C)
    const b = blade(x, y, out + (r() - 0.5) * 1.4, 46 + r() * 18, 17, r, { curl: (r() - 0.5) * 0.9 })
    med.push({ d: b.d, fill: jitter(pick(P.leaf.slice(0, 3), r), r, 0.12) })
    leads.push({ d: b.vein, w: 2 })
  }
  chakraSpine([[C, 690], [C, 645], [C, 600], [C, 555], [C, 508], [C, 448], [C, 370]], jewels)
}

// ── WIND: a feather riding banded air beneath a crescent moon ─────────────
function windFeather(r, P, med, leads, jewels) {
  const cols = [P.deep[1], P.flame[0], P.bright[0], P.pale[0], P.clear[0], P.bright[2], P.flame[2], P.deep[2]]
  let prev = null
  for (let k = 0; k <= 8; k++) {
    const y0 = 170 + k * 82
    const line = []
    for (let x = 150; x <= 850; x += 50) line.push([x, y0 + Math.sin(x / 70 + k * 0.9) * 26 + (r() - 0.5) * 6])
    if (prev) med.push({ d: cutPath([...prev, ...line.slice().reverse()]), fill: jitter(cols[(k - 1) % cols.length], r) })
    prev = line
  }

  // curls of wind
  for (const [cx, cy, s] of [[300, 610, 1], [700, 470, -1], [640, 690, 1], [330, 420, -1]]) {
    const pts = []
    for (let i = 0; i < 14; i++) {
      const a = i * 0.55 * s
      const rr = 52 - i * 3.4
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr])
    }
    leads.push({ d: smoothOpen(pts), w: 4 })
  }

  // crescent moon
  med.push({ d: `M330,250 A70,70 0 1,0 410,340 A56,56 0 1,1 330,250Z`, fill: P.pale[1] })

  // the feather: shaft from lower-left to upper-right, barbs both sides
  const x0 = 420, y0 = 760, x1 = 600, y1 = 250
  const ang = Math.atan2(y1 - y0, x1 - x0)
  const len = Math.hypot(x1 - x0, y1 - y0)
  for (let i = 0; i < 11; i++) {
    const t = 0.12 + (i / 10) * 0.8
    const bx = x0 + (x1 - x0) * t
    const by = y0 + (y1 - y0) * t
    const bl = 150 * Math.sin(Math.PI * Math.min(0.98, t * 1.05)) + 20
    for (const side of [1, -1]) {
      const b = blade(bx, by, ang + side * 1.05, bl, 24, r, { curl: -0.7 * side })
      med.push({ d: b.d, fill: jitter((i + (side > 0 ? 0 : 1)) % 3 === 0 ? P.leaf[2] : (i % 2 ? P.pale[0] : P.clear[1]), r) })
    }
  }
  leads.push({ d: smoothOpen([[x0 - 30, y0 + 70], [x0, y0], [x0 + (x1 - x0) * 0.5, y0 + (y1 - y0) * 0.5 + 6], [x1, y1]]), w: 7 })
  const sp = [0.14, 0.26, 0.38, 0.5, 0.62, 0.74, 0.88].map((t) => [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t])
  void len
  chakraSpine(sp, jewels, 10)
}
