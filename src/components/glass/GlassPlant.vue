<script setup>
import { computed } from 'vue'
import { rng, blade, smoothOpen, smoothClosed, jitter, pick, PALETTES, LEAD } from '../../lib/glass.js'

// Leaded-glass plants: every leaf a pane, every vein and stem a line of lead.
const props = defineProps({
  kind: { type: String, default: 'fern' }, // fern | ivy | monstera | pothos
  element: { type: String, default: 'fire' },
  seed: { type: Number, default: 3 },
  flip: { type: Boolean, default: false },
})

const VB = { fern: [320, 620], ivy: [640, 260], monstera: [420, 440], pothos: [220, 760] }

function heart(x, y, ang, len, w, r) {
  // heart-shaped leaf: notch at the stem, point at the tip
  const pts = []
  const n = 9
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const lobe = Math.sin(Math.PI * Math.pow(t, 0.6)) * w * (1.15 - t * 0.6)
    pts.push([t * len, -lobe + (r() - 0.5) * 2])
  }
  for (let i = n - 1; i >= 1; i--) {
    const t = i / n
    const lobe = Math.sin(Math.PI * Math.pow(t, 0.6)) * w * (1.15 - t * 0.6)
    pts.push([t * len, lobe + (r() - 0.5) * 2])
  }
  pts.push([len * 0.06, 0])
  const c = Math.cos(ang)
  const s = Math.sin(ang)
  return smoothClosed(pts.map(([px, py]) => [x + px * c - py * s, y + px * s + py * c]), 0.9)
}

const g = computed(() => {
  const r = rng(props.seed)
  const P = PALETTES[props.element]
  const leaf = () => jitter(pick(P.leaf.slice(0, 3), r), r, 0.1)
  const panes = []
  const lines = []

  if (props.kind === 'fern') {
    const stem = []
    for (let i = 0; i <= 12; i++) {
      const t = i / 12
      stem.push([160 + Math.sin(t * 2.2) * 40 * t, 610 - t * 570])
    }
    for (let i = 1; i < stem.length - 1; i++) {
      const [x, y] = stem[i]
      const [nx, ny] = stem[i + 1]
      const ang = Math.atan2(ny - y, nx - x)
      const t = i / stem.length
      const len = 125 * Math.pow(1 - t, 0.7) + 14
      for (const side of [1, -1]) {
        const b = blade(x, y, ang + side * 1.05, len, 12 + 6 * (1 - t), r, { curl: -0.5 * side })
        panes.push({ d: b.d, fill: leaf() })
        lines.push({ d: b.vein, w: 2 })
      }
    }
    lines.unshift({ d: smoothOpen(stem), w: 6 })
  }

  if (props.kind === 'ivy') {
    const vine = []
    for (let x = 0; x <= 640; x += 40) vine.push([x, 120 + Math.sin(x / 70) * 50])
    lines.push({ d: smoothOpen(vine), w: 6 })
    for (let i = 1; i < vine.length - 1; i++) {
      const [x, y] = vine[i]
      const side = i % 2 ? 1 : -1
      const ang = side * (Math.PI / 2) + (r() - 0.5) * 0.6
      const len = 62 + r() * 24
      panes.push({ d: heart(x, y, ang, len, 30, r), fill: leaf() })
      lines.push({ d: smoothOpen([[x, y], [x + Math.cos(ang) * len * 0.4, y + Math.sin(ang) * len * 0.4], [x + Math.cos(ang) * len * 0.8, y + Math.sin(ang) * len * 0.8]]), w: 2 })
    }
  }

  if (props.kind === 'monstera') {
    // a monstera leaf leaded as separate fingers either side of the midrib
    const base = [210, 430]
    const tip = [230, 30]
    const rib = [base, [200, 300], [214, 160], tip]
    for (let i = 0; i < 8; i++) {
      const t = 0.12 + i * 0.105
      const x = base[0] + (tip[0] - base[0]) * t + Math.sin(t * 3) * -8
      const y = base[1] + (tip[1] - base[1]) * t
      const env = Math.sin(Math.PI * Math.pow(t, 0.75)) * 190 + 20
      for (const side of [1, -1]) {
        const ang = side === 1 ? -0.55 + t * -0.5 : Math.PI + 0.55 + t * 0.5
        const b = blade(x, y, ang, env, 22 - t * 6, r, { curl: side * 0.6, belly: 0.1 })
        panes.push({ d: b.d, fill: leaf() })
      }
    }
    lines.push({ d: smoothOpen(rib), w: 7 })
    lines.push({ d: smoothOpen([[base[0], 440], [base[0] + 4, 470]]), w: 7 })
  }

  if (props.kind === 'pothos') {
    const vine = []
    for (let y = 0; y <= 760; y += 46) vine.push([110 + Math.sin(y / 110) * 46, y])
    lines.push({ d: smoothOpen(vine), w: 5 })
    for (let i = 1; i < vine.length; i++) {
      const [x, y] = vine[i]
      const side = i % 2 ? 1 : -1
      const ang = Math.PI / 2 + side * 0.9 + (r() - 0.5) * 0.4
      panes.push({ d: heart(x, y, ang, 70 - i * 1.2, 28, r), fill: leaf() })
    }
  }
  return { panes, lines }
})

const vb = computed(() => VB[props.kind])
</script>

<template>
  <svg
    class="plant"
    :viewBox="`0 0 ${vb[0]} ${vb[1]}`"
    :style="flip ? { transform: 'scaleX(-1)' } : null"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(p, i) in g.panes" :key="'p' + i" :d="p.d" :fill="p.fill" />
    <g fill="none" :stroke="LEAD" stroke-linejoin="round" stroke-linecap="round">
      <path v-for="(p, i) in g.panes" :key="'o' + i" :d="p.d" stroke-width="5" />
      <path v-for="(l, i) in g.lines" :key="'l' + i" :d="l.d" :stroke-width="l.w" />
    </g>
  </svg>
</template>

<style scoped>
.plant {
  display: block;
  overflow: visible;
  pointer-events: none;
  filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.45));
}
</style>
