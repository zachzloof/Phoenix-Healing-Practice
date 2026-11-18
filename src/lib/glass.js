// Procedural stained-glass geometry.
// Every pane is a closed path; the lead came is the same path stroked on top.
// A seeded RNG keeps each window identical between renders while still
// giving every pane a hand-cut wobble (nothing here is vector-perfect).

export function rng(seed = 1) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n) => Math.round(n * 10) / 10

/** Smooth closed Catmull-Rom spline through points -> SVG path. */
export function smoothClosed(pts, k = 1) {
  const n = pts.length
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * k
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * k
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * k
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * k
    d += `C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`
  }
  return d + 'Z'
}

/** Smooth open spline (for vines, veins, wind curls). */
export function smoothOpen(pts, k = 1) {
  const n = pts.length
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(i + 2, n - 1)]
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * k
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * k
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * k
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * k
    d += `C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`
  }
  return d
}

/** Hand-cut polygon: straight-ish segments through jittered points. */
export function cutPath(pts) {
  return 'M' + pts.map((p) => `${f(p[0])},${f(p[1])}`).join('L') + 'Z'
}

const polar = (cx, cy, r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]

/** Annular sector pane between radii r1<r2 and angles a1<a2 (radians). */
export function sector(cx, cy, r1, r2, a1, a2, rand, wob = 2.5, steps = 6) {
  const pts = []
  const j = () => (rand() - 0.5) * wob * 2
  for (let i = 0; i <= steps; i++) {
    const a = a1 + ((a2 - a1) * i) / steps
    const [x, y] = polar(cx, cy, r2 + (i && i < steps ? j() : 0), a)
    pts.push([x, y])
  }
  for (let i = steps; i >= 0; i--) {
    const a = a1 + ((a2 - a1) * i) / steps
    const [x, y] = polar(cx, cy, r1 + (i && i < steps ? j() : 0), a)
    pts.push([x, y])
  }
  return cutPath(pts)
}

/**
 * Leaf / feather / petal: pointed at the tip, rounded at the base.
 * Returns path in local space with base at (0,0) pointing along +x.
 */
export function bladePts(len, width, rand, { curl = 0, belly = 0.35 } = {}) {
  const pts = []
  const steps = 7
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const w = Math.sin(Math.PI * Math.pow(t, 0.8)) * width * (1 - t * 0.25)
    const x = t * len
    const y = -w + curl * t * t * len * 0.25 + (rand() - 0.5) * width * 0.08
    pts.push([x, y])
  }
  for (let i = steps - 1; i > 0; i--) {
    const t = i / steps
    const w = Math.sin(Math.PI * Math.pow(t, 0.8)) * width * (1 - t * 0.25) * (1 - belly * 0.3)
    const x = t * len
    const y = w + curl * t * t * len * 0.25 + (rand() - 0.5) * width * 0.08
    pts.push([x, y])
  }
  return pts
}

export function transformPts(pts, x, y, angle, s = 1) {
  const c = Math.cos(angle)
  const sn = Math.sin(angle)
  return pts.map(([px, py]) => [x + (px * c - py * sn) * s, y + (px * sn + py * c) * s])
}

/** A blade placed in world space, plus its centre vein as a lead line. */
export function blade(x, y, angle, len, width, rand, opts = {}) {
  const pts = transformPts(bladePts(len, width, rand, opts), x, y, angle)
  const vein = transformPts(
    [
      [len * 0.04, 0],
      [len * 0.45, (opts.curl || 0) * 0.05 * len],
      [len * 0.82, (opts.curl || 0) * 0.17 * len],
    ],
    x,
    y,
    angle,
  )
  return { d: smoothClosed(pts, 0.9), vein: smoothOpen(vein) }
}

/** A rising flame tongue from a base line. */
export function flameTongue(x, base, w, h, rand, lean = 0) {
  const pts = []
  const n = 6
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const sway = Math.sin(t * Math.PI * 1.6 + rand() * 0.6) * w * 0.18
    pts.push([x - w / 2 + (w / 2) * t * 0.9 + sway + lean * t * t, base - h * t])
  }
  pts[n] = [x + lean, base - h]
  for (let i = n - 1; i >= 0; i--) {
    const t = i / n
    const sway = Math.sin(t * Math.PI * 1.4 + 1.3 + rand() * 0.6) * w * 0.16
    pts.push([x + w / 2 - (w / 2) * t * 0.9 + sway + lean * t * t, base - h * t])
  }
  return smoothClosed(pts, 0.85)
}

/** Jitter a hex colour's lightness a little so no two panes are the same glass. */
export function jitter(hex, rand, amt = 0.07) {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) & 255
  let g = (n >> 8) & 255
  let b = n & 255
  const k = 1 + (rand() - 0.5) * 2 * amt
  r = Math.min(255, Math.round(r * k))
  g = Math.min(255, Math.round(g * k))
  b = Math.min(255, Math.round(b * k))
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

export const pick = (arr, rand) => arr[Math.floor(rand() * arr.length)]

// ── Glass palettes ────────────────────────────────────────────────────────
export const CHAKRAS = [
  { name: 'Root', color: '#c8202a' },
  { name: 'Sacral', color: '#ee7a1a' },
  { name: 'Solar plexus', color: '#f2c423' },
  { name: 'Heart', color: '#4fa040' },
  { name: 'Throat', color: '#2f8fce' },
  { name: 'Third eye', color: '#4a45b0' },
  { name: 'Crown', color: '#9353c6' },
]

export const PALETTES = {
  fire: {
    deep: ['#5e0d16', '#7a1420', '#8f1c1c'],
    flame: ['#b8341b', '#d9481d', '#e2621f'],
    bright: ['#f0912a', '#f4a733', '#f6c143'],
    pale: ['#fbe39a', '#f9d77a'],
    leaf: ['#3f6a24', '#5a8a2c', '#78a93a', '#2f5320'],
    clear: ['#efe3c6', '#e9dcc0', '#f2e9d3'],
    border: ['#a8461f', '#c26a24', '#8f2a1c'],
  },
  earth: {
    deep: ['#4a2c17', '#5c3820', '#3d2614'],
    flame: ['#a9532c', '#b5602f', '#9b4a26'],
    bright: ['#c98b2c', '#d39b3d', '#b9792a'],
    pale: ['#e3c48a', '#d9b577'],
    leaf: ['#4f6d26', '#62802e', '#7b9338', '#3b5520'],
    clear: ['#e8dcc0', '#e0d3b4', '#ebe2c9'],
    border: ['#8a5a2b', '#a2703a', '#6e4423'],
  },
  air: {
    deep: ['#25336b', '#2d3f7e', '#1f2a5c'],
    flame: ['#5a72c6', '#6d86d2', '#7f8fd6'],
    bright: ['#8cc6e8', '#a3d3ee', '#7bb8df'],
    pale: ['#d6ecf5', '#cde3ef'],
    leaf: ['#3e8f99', '#57a7ad', '#b9a3dc', '#9d86cf'],
    clear: ['#eef3f4', '#e6eef1', '#f1f5f2'],
    border: ['#6f7fc9', '#8a79c4', '#5a6cb5'],
  },
}

export const LEAD = '#17110e'
