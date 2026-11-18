<script setup>
import { computed } from 'vue'
import ElementHero from '../components/ElementHero.vue'
import HowItWorks from '../components/HowItWorks.vue'
import RoseWindow from '../components/glass/RoseWindow.vue'
import ChakraJewel from '../components/glass/ChakraJewel.vue'
import GlassPlant from '../components/glass/GlassPlant.vue'
import { SERVICES, CONTACT } from '../content/site.js'

const props = defineProps({ service: { type: String, required: true } })
const s = computed(() => SERVICES[props.service])
const other = computed(() => SERVICES[props.service === 'mfr' ? 'shamanic' : 'mfr'])
const seed = computed(() => (props.service === 'mfr' ? 17 : 31))
</script>

<template>
  <ElementHero
    :element="s.element"
    :seed="seed"
    :title="s.name"
    :line="s.line"
    :secondary="{ label: 'Ask Penny a question', to: '/#contact' }"
  >
    <p>{{ s.summary }} With Penny Theophanous in {{ CONTACT.location }}.</p>
  </ElementHero>

  <section class="section" :aria-labelledby="`${s.key}-what`">
    <div class="wrap came what">
      <div class="pane-clear words">
        <h2 :id="`${s.key}-what`">What is {{ s.name }}?</h2>
        <p v-for="p in s.body" :key="p">{{ p }}</p>
      </div>
      <div class="pane-dim ideal">
        <GlassPlant :kind="s.element === 'earth' ? 'fern' : 'pothos'" :element="s.element" :seed="seed + 3" class="plant" />
        <h3>Ideal for</h3>
        <ul>
          <li v-for="(pt, i) in s.idealFor" :key="pt">
            <ChakraJewel :chakra="i + (s.element === 'earth' ? 0 : 2)" :size="22" />
            {{ pt }}
          </li>
        </ul>
        <p class="price"><span>{{ CONTACT.price }}</span> per session</p>
      </div>
    </div>
  </section>

  <HowItWorks :element="s.element" title="What to expect" lede="Every session is tailored to you. This is the shape it usually takes." />

  <section class="section" aria-labelledby="other-title">
    <div class="wrap came other" :data-element="other.element">
      <RouterLink :to="other.to" class="other-window" :aria-label="`${other.name}: the ${other.elementName.toLowerCase()} window`">
        <RoseWindow :element="other.element" :seed="props.service === 'mfr' ? 31 : 17" />
      </RouterLink>
      <div class="pane-clear other-words">
        <h2 id="other-title">Or step through the {{ other.elementName.toLowerCase() }} window</h2>
        <p>{{ other.summary }}</p>
        <RouterLink :to="other.to" class="pane-dim btn-glass go">
          Explore {{ other.name }}
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10h11m-4-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="section closing" aria-labelledby="close-title">
    <div class="wrap came close">
      <div class="pane-clear close-words">
        <h2 id="close-title">Ready when you are</h2>
        <p>Sessions are {{ CONTACT.price }} and take place in {{ CONTACT.location }}.</p>
      </div>
      <RouterLink to="/#booking" class="pane-amber btn-glass close-cta">Book a session</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.what {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.9fr);
}
.words {
  display: grid;
  align-content: center;
  gap: 1.2rem;
  padding: clamp(2rem, 5vw, 4.5rem);
  font-size: 1.2rem;
}
.words h2,
.other-words h2,
.close-words h2 {
  font-size: clamp(2.2rem, 4.2vw, 3.4rem);
  color: #5c3820;
}
[data-element='air'] .words h2,
[data-element='air'] .close-words h2,
.other[data-element='air'] .other-words h2 { color: #25336b; }
.other[data-element='earth'] .other-words h2 { color: #5c3820; }
.words p { max-width: 62ch; color: var(--color-ink-soft); }

.ideal {
  position: relative;
  overflow: hidden;
  padding: clamp(2rem, 4vw, 3rem);
  padding-bottom: 12rem;
}
.ideal h3 { font-size: 2rem; color: var(--heading); margin-bottom: 1.2rem; }
.ideal ul { display: grid; gap: 0.95rem; margin: 0; padding: 0; list-style: none; }
.ideal li { display: flex; align-items: center; gap: 0.8rem; font-size: 1.2rem; }
.price { margin-top: 2rem; color: var(--text-on-room-soft); }
.price span { font-family: var(--font-display); font-size: 2rem; color: var(--color-marigold); margin-right: 0.3rem; }
.plant { position: absolute; right: -2%; bottom: -14%; height: 16rem; }
[data-element='air'] .plant { bottom: auto; top: -4%; right: 4%; height: 22rem; opacity: 0.9; }

.other {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
}
.other-window {
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  background:
    repeating-linear-gradient(62deg, #17110e 0 3px, transparent 3px 56px),
    repeating-linear-gradient(-62deg, #17110e 0 3px, transparent 3px 56px),
    var(--seeds),
    radial-gradient(70% 60% at 50% 45%, #5a4416, #1d1609 75%);
  transition: filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.other[data-element='air'] .other-window {
  background:
    repeating-linear-gradient(62deg, #17110e 0 3px, transparent 3px 56px),
    repeating-linear-gradient(-62deg, #17110e 0 3px, transparent 3px 56px),
    var(--seeds),
    radial-gradient(70% 60% at 50% 45%, #2c3f86, #111833 75%);
}
.other-window:hover { filter: brightness(1.15); }
.other-window > * { width: min(100%, 22rem); }
.other-words {
  display: grid;
  align-content: center;
  gap: 1.2rem;
  padding: clamp(2rem, 5vw, 4rem);
}
.other-words p { max-width: 55ch; color: var(--color-ink-soft); }
.go {
  justify-self: start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.3rem;
  border: 4px solid #17110e;
  font-size: 1.15rem;
}
.go:hover { filter: brightness(1.5); }

.close {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
}
.close-words { display: grid; gap: 0.8rem; padding: clamp(2rem, 4vw, 3rem); }
.close-words p { color: var(--color-ink-soft); font-size: 1.2rem; }
.close-cta { font-size: clamp(1.5rem, 2.6vw, 2.1rem); padding: 1.5rem; }

@media (max-width: 860px) {
  .what,
  .other,
  .close { grid-template-columns: 1fr; }
  .ideal { padding-bottom: 7rem; }
  .plant { height: 10rem; }
  [data-element='air'] .plant { height: 12rem; top: auto; bottom: -2rem; }
  .go { justify-self: stretch; }
  .close-cta { min-height: 4.5rem; }
}
</style>
