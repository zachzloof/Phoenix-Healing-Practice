<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StepGlass from './glass/StepGlass.vue'
import GlassPlant from './glass/GlassPlant.vue'
import { STEPS } from '../content/site.js'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  element: { type: String, default: 'fire' },
  title: { type: String, default: 'How a session unfolds' },
  lede: { type: String, default: 'Your healing journey begins with a single, courageous step.' },
})

// The four steps are panes that light one after another as you reach them.
const root = ref(null)
let mm
onMounted(() => {
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const panes = gsap.utils.toArray('.step', root.value)
    gsap.set(panes, { '--lit': 0 })
    ScrollTrigger.create({
      trigger: root.value,
      start: 'top 70%',
      once: true,
      onEnter: () => gsap.to(panes, { '--lit': 1, duration: 1.4, ease: 'expo.out', stagger: 0.45 }),
    })
  }, root.value)
})
onBeforeUnmount(() => mm?.revert())
</script>

<template>
  <section id="process" ref="root" class="section" aria-labelledby="process-title">
    <GlassPlant kind="monstera" :element="element" :seed="91" class="margin-plant" style="left: -2rem; bottom: 1rem; height: 18rem" />
    <GlassPlant kind="pothos" :element="element" :seed="92" class="margin-plant" style="right: 1%; top: 0; height: 24rem" />
    <div class="wrap">
      <header class="section-head">
        <h2 id="process-title">{{ title }}</h2>
        <p>{{ lede }}</p>
      </header>
      <ol class="came steps">
        <li v-for="(s, i) in STEPS" :key="s.title" class="step">
          <div class="glass"><StepGlass :stage="i" :element="element" /></div>
          <div class="pane-clear copy">
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0;
  list-style: none;
}
.step {
  --lit: 1;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: var(--came);
}
.glass {
  aspect-ratio: 1;
  filter: brightness(calc(0.45 + var(--lit) * 0.6)) saturate(calc(0.6 + var(--lit) * 0.5));
}
.copy {
  display: grid;
  align-content: start;
  gap: 0.6rem;
  padding: 1.4rem 1.3rem 1.6rem;
  opacity: calc(0.55 + var(--lit) * 0.45);
}
h3 { font-size: 1.45rem; color: var(--color-ruby); }
[data-element='earth'] h3 { color: #5c3820; }
[data-element='air'] h3 { color: #25336b; }
.copy p { font-size: 1.05rem; color: var(--color-ink-soft); }

@media (max-width: 980px) {
  .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 540px) {
  .step { grid-template-columns: 7rem 1fr; grid-template-rows: none; }
  .glass { aspect-ratio: auto; }
  .steps { grid-template-columns: 1fr; }
}
</style>
