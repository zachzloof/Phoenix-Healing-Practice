<script setup>
import { computed } from 'vue'
import { rng, blade, smoothClosed, jitter, PALETTES, LEAD } from '../../lib/glass.js'

// A small leaded panel showing one stage of growth: seed, sprout, leafing, bloom.
const props = defineProps({
  stage: { type: Number, default: 0 },
  element: { type: String, default: 'fire' },
})

const g = computed(() => {
  const r = rng(40 + props.stage)
  const P = PALETTES[props.element]
  const panes = []
  const veins = []
  // sky in three cut bands, soil below
  panes.push({ d: 'M0,0H200V60C140,70 70,50 0,64Z', fill: P.deep[1] })
  panes.push({ d: 'M0,64C70,50 140,70 200,60V118C130,126 60,110 0,122Z', fill: P.flame[1] })
  panes.push({ d: 'M0,122C60,110 130,126 200,118V150H0Z', fill: P.bright[0] })
  panes.push({ d: 'M0,150H200V200H0Z', fill: P.deep[2] })
  panes.push({ d: smoothClosed([[0, 150], [60, 140], [130, 156], [200, 146], [200, 166], [100, 172], [0, 164]]), fill: '#5c3820' })

  const s = props.stage
  if (s === 0) {
    panes.push({ d: smoothClosed([[86, 172], [100, 160], [116, 170], [110, 186], [92, 186]]), fill: P.pale[0] })
  } else {
    const h = [0, 40, 80, 110][s]
    panes.push({ d: `M97,160L95,${160 - h}L105,${160 - h}L103,160Z`, fill: P.leaf[0] })
    const leaves = s === 1 ? 2 : s === 2 ? 4 : 4
    for (let i = 0; i < leaves; i++) {
      const y = 160 - h * (0.3 + (i >> 1) * 0.4)
      const side = i % 2 ? 1 : -1
      const b = blade(100, y, side === 1 ? -0.5 : Math.PI + 0.5, 46, 15, r, { curl: -0.4 * side })
      panes.push({ d: b.d, fill: jitter(P.leaf[(i + 1) % 3], r) })
      veins.push(b.vein)
    }
    if (s === 3) {
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 - Math.PI / 2
        const b = blade(100, 160 - h, a, 34, 12, r)
        panes.push({ d: b.d, fill: jitter(i % 2 ? P.bright[2] : P.pale[0], r) })
      }
      panes.push({ d: smoothClosed(Array.from({ length: 8 }, (_, i) => [100 + 10 * Math.cos(i * 0.785), 160 - h + 10 * Math.sin(i * 0.785)])), fill: P.flame[0] })
    }
  }
  return { panes, veins }
})
</script>

<template>
  <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" class="step-glass">
    <path v-for="(p, i) in g.panes" :key="'p' + i" :d="p.d" :fill="p.fill" />
    <g fill="none" :stroke="LEAD" stroke-width="4" stroke-linejoin="round">
      <path v-for="(p, i) in g.panes" :key="'l' + i" :d="p.d" />
      <path v-for="(v, i) in g.veins" :key="'v' + i" :d="v" stroke-width="2" />
    </g>
  </svg>
</template>

<style scoped>
.step-glass { display: block; width: 100%; height: 100%; }
</style>
