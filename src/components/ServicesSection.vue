<script setup>
import RoseWindow from './glass/RoseWindow.vue'
import ChakraJewel from './glass/ChakraJewel.vue'
import GlassPlant from './glass/GlassPlant.vue'
import { SERVICES, CONTACT } from '../content/site.js'

const list = [SERVICES.mfr, SERVICES.shamanic]
</script>

<template>
  <section id="services" class="section" aria-labelledby="services-title">
    <GlassPlant kind="pothos" element="fire" :seed="71" class="margin-plant" style="left: 1%; top: 0; height: 30rem" />
    <GlassPlant kind="pothos" element="fire" :seed="72" class="margin-plant" style="right: 1%; top: 0; height: 22rem" />
    <div class="wrap">
      <header class="section-head">
        <h2 id="services-title">Two windows, one practice</h2>
        <p>
          Holistic healing that honours the whole of you: body, mind and spirit. Every session is
          tailored to your individual needs.
        </p>
      </header>

      <div class="pair">
        <article v-for="(s, k) in list" :key="s.key" class="came service" :data-element="s.element">
          <RouterLink :to="s.to" class="window-cell" :aria-label="`${s.name}: the ${s.elementName.toLowerCase()} window`">
            <RoseWindow :element="s.element" :seed="k ? 31 : 17" />
            <GlassPlant :kind="k ? 'pothos' : 'fern'" :element="s.element" :seed="k + 4" class="plant" :class="k ? 'hang' : 'rise'" />
          </RouterLink>

          <div class="pane-clear text">
            <h3>{{ s.name }}</h3>
            <p class="element">The {{ s.elementName.toLowerCase() }} window</p>
            <p>{{ s.summary }}</p>
            <ul>
              <li v-for="(pt, i) in s.idealFor" :key="pt"><ChakraJewel :chakra="(k ? 2 : 0) + i" :size="16" />{{ pt }}</li>
            </ul>
          </div>

          <div class="foot">
            <p class="pane-dim price"><span>{{ CONTACT.price }}</span> per session</p>
            <RouterLink :to="s.to" class="pane-dim btn-glass go">
              Explore {{ s.name }}
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10h11m-4-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  align-items: start;
}
.pair > :last-child { margin-top: clamp(0rem, 6vw, 5rem); }

.service {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.window-cell {
  position: relative;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  overflow: hidden;
  background:
    repeating-linear-gradient(62deg, #17110e 0 3px, transparent 3px 56px),
    repeating-linear-gradient(-62deg, #17110e 0 3px, transparent 3px 56px),
    var(--seeds),
    radial-gradient(70% 60% at 50% 45%, #5a4416, #1d1609 75%);
  transition: filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.service[data-element='air'] .window-cell {
  background:
    repeating-linear-gradient(62deg, #17110e 0 3px, transparent 3px 56px),
    repeating-linear-gradient(-62deg, #17110e 0 3px, transparent 3px 56px),
    var(--seeds),
    radial-gradient(70% 60% at 50% 45%, #2c3f86, #111833 75%);
}
.window-cell > :first-child { width: min(100%, 26rem); }
.window-cell:hover { filter: brightness(1.15) saturate(1.1); }
.plant { position: absolute; z-index: 1; }
.rise { right: -4%; bottom: -10%; height: 62%; }
.hang { left: 2%; top: -6%; height: 78%; }

.text {
  display: grid;
  align-content: start;
  gap: 0.9rem;
  padding: clamp(1.6rem, 3.5vw, 2.6rem);
}
h3 {
  font-size: clamp(2rem, 3.4vw, 2.75rem);
  color: #5c3820;
}
.service[data-element='air'] h3 { color: #25336b; }
.element {
  margin-top: -0.4rem;
  font-style: italic;
  font-size: 1.15rem;
  color: var(--color-ink-soft);
}
.text p { color: var(--color-ink-soft); }
ul { display: grid; gap: 0.45rem; margin: 0.3rem 0 0; padding: 0; list-style: none; }
li { display: flex; align-items: center; gap: 0.65rem; color: var(--color-ink); }

.foot {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--came);
}
.price {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 1rem 1.3rem;
  color: var(--text-on-room-soft);
}
.price span { font-family: var(--font-display); font-size: 1.6rem; color: var(--color-marigold); }
.go {
  justify-content: space-between;
  padding: 1rem 1.3rem;
  font-size: 1.15rem;
  color: var(--text-on-room);
}
.go:hover { filter: brightness(1.5); }

@media (max-width: 900px) {
  .pair { grid-template-columns: 1fr; }
  .pair > :last-child { margin-top: 0; }
}
@media (max-width: 460px) {
  .foot { grid-template-columns: 1fr; }
}
</style>
