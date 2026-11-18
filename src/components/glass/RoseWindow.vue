<script setup>
import { computed, ref, useId } from 'vue'
import { buildRose } from '../../lib/rose.js'
import { LEAD } from '../../lib/glass.js'
import { useFirelight } from '../../composables/useFirelight.js'

const props = defineProps({
  element: { type: String, default: 'fire' }, // fire | earth | air
  seed: { type: Number, default: 7 },
  ignite: { type: Boolean, default: false },
  label: { type: String, default: '' },
})

const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
const g = computed(() => buildRose(props.element, props.seed))
const root = ref(null)
useFirelight(root, { ignite: props.ignite, rest: { x: 50, y: 44 }, radius: 48 })

const defaultLabel = {
  fire: 'Stained-glass rose window: a phoenix rising from flames, circled by leaves, with the seven chakra jewels running up its body',
  earth: 'Stained-glass rose window: a tree on rolling hills whose roots knit into a web, with the seven chakra jewels running up its trunk',
  air: 'Stained-glass rose window: a feather riding bands of wind under a crescent moon, with the seven chakra jewels along its shaft',
}
</script>

<template>
  <div ref="root" class="rose" :data-element="element">
    <svg viewBox="0 0 1000 1000" role="img" :aria-label="label || defaultLabel[element]">
      <defs>
        <clipPath :id="`w${uid}`"><circle cx="500" cy="500" r="489" /></clipPath>
        <clipPath :id="`m${uid}`"><circle cx="500" cy="500" r="309" /></clipPath>
        <pattern :id="`s${uid}`" width="140" height="140" patternUnits="userSpaceOnUse">
          <ellipse cx="18" cy="22" rx="3" ry="2" />
          <ellipse cx="71" cy="12" rx="1.6" ry="1.2" />
          <ellipse cx="112" cy="40" rx="2.4" ry="1.8" />
          <ellipse cx="44" cy="68" rx="1.4" ry="1" />
          <ellipse cx="96" cy="88" rx="3.2" ry="2.2" />
          <ellipse cx="24" cy="116" rx="2" ry="1.5" />
          <ellipse cx="128" cy="124" rx="1.4" ry="1" />
          <ellipse cx="66" cy="132" rx="2.2" ry="1.6" />
          <path d="M0,50 C40,44 90,60 140,52" class="streak" />
          <path d="M0,104 C50,98 80,112 140,100" class="streak" />
        </pattern>
        <radialGradient :id="`j${uid}`" cx="38%" cy="34%" r="70%">
          <stop offset="0" stop-color="#fff" stop-opacity=".85" />
          <stop offset=".25" stop-color="#fff" stop-opacity=".18" />
          <stop offset="1" stop-color="#000" stop-opacity=".35" />
        </radialGradient>
      </defs>

      <g :clip-path="`url(#w${uid})`">
        <path v-for="(p, i) in g.ring" :key="'r' + i" :d="p.d" :fill="p.fill" />
        <g :clip-path="`url(#m${uid})`">
          <path v-for="(p, i) in g.med" :key="'m' + i" :d="p.d" :fill="p.fill" />
        </g>
        <rect width="1000" height="1000" :fill="`url(#s${uid})`" class="seeds" />
      </g>

      <!-- lead came: every pane edge, then the inner lines -->
      <g fill="none" :stroke="LEAD" stroke-linejoin="round" stroke-linecap="round">
        <path v-for="(p, i) in g.ring" :key="'lr' + i" :d="p.d" stroke-width="7" />
        <g :clip-path="`url(#m${uid})`">
          <path v-for="(p, i) in g.med" :key="'lm' + i" :d="p.d" stroke-width="6" />
          <path v-for="(l, i) in g.leads" :key="'ll' + i" :d="l.d" :stroke-width="l.w" />
        </g>
        <circle cx="500" cy="500" r="309" stroke-width="9" />
        <circle cx="500" cy="500" r="328" stroke-width="7" />
        <circle cx="500" cy="500" r="440" stroke-width="8" />
        <circle cx="500" cy="500" r="489" stroke-width="16" />
      </g>

      <g v-for="(j, i) in g.jewels" :key="'j' + i">
        <title v-if="j.chakra">{{ j.chakra }} chakra</title>
        <circle :cx="j.cx" :cy="j.cy" :r="j.r + 4" :fill="LEAD" />
        <circle :cx="j.cx" :cy="j.cy" :r="j.r" :fill="j.color" />
        <circle :cx="j.cx" :cy="j.cy" :r="j.r" :fill="`url(#j${uid})`" />
      </g>
    </svg>
    <div class="shade" aria-hidden="true" />
    <div class="bloom" aria-hidden="true" />
  </div>
</template>

<style scoped>
.rose {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  border-radius: 50%;
  isolation: isolate;
  filter: drop-shadow(0 18px 40px rgb(0 0 0 / 0.55));
}
.rose svg { display: block; width: 100%; height: 100%; }
.rose pattern ellipse { fill: rgb(255 255 255 / 0.4); stroke: rgb(60 30 10 / 0.22); stroke-width: 0.8; }
.rose pattern .streak { fill: none; stroke: rgb(255 255 255 / 0.12); stroke-width: 3; }
.seeds { pointer-events: none; }

/* Unlit glass is dim; the light pool behind it is where colour comes alive. */
.shade,
.bloom {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}
.shade {
  background: radial-gradient(
    circle at var(--lx, 50%) var(--ly, 45%),
    rgb(12 5 2 / 0) 0%,
    rgb(12 5 2 / 0) calc(var(--lr, 46%) * 0.3),
    rgb(12 5 2 / calc(0.46 - var(--li, 1) * 0.16)) var(--lr, 46%),
    rgb(12 5 2 / 0.5) calc(var(--lr, 46%) * 1.7)
  );
}
.bloom {
  mix-blend-mode: screen;
  opacity: calc(var(--li, 1) * 0.55);
  background: radial-gradient(
    circle at var(--lx, 50%) var(--ly, 45%),
    rgb(var(--bloom) / 0.5) 0%,
    rgb(var(--bloom) / 0.14) calc(var(--lr, 46%) * 0.55),
    transparent var(--lr, 46%)
  );
}
.rose[data-element='earth'] { --bloom: 240 196 120; }
.rose[data-element='air'] { --bloom: 200 226 255; }
.rose[data-element='fire'] { --bloom: 255 172 70; }
</style>
