<script setup>
import RoseWindow from './glass/RoseWindow.vue'
import GlassPlant from './glass/GlassPlant.vue'

defineProps({
  element: { type: String, default: 'fire' },
  seed: { type: Number, default: 7 },
  title: { type: String, required: true },
  line: { type: String, required: true },
  secondary: { type: Object, default: () => ({ label: 'Explore the services', to: '/#services' }) },
})
</script>

<template>
  <section class="hero" :data-element="element" aria-labelledby="hero-title">
    <div class="came panel">
      <div class="pane-clear words">
        <h1 id="hero-title">{{ title }}</h1>
        <p class="line">{{ line }}</p>
        <div class="body"><slot /></div>
        <GlassPlant kind="fern" :element="element" :seed="seed + 19" class="pane-fern" flip />
      </div>

      <div class="actions">
      <RouterLink to="/#booking" class="pane-amber btn-glass cta">
        <span>Book a session</span>
        <span class="price">£60</span>
      </RouterLink>
      <RouterLink :to="secondary.to" class="pane-dim btn-glass second">
        {{ secondary.label }}
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10h11m-4-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </RouterLink>
      </div>

      <div class="quarry">
        <GlassPlant kind="ivy" :element="element" :seed="seed + 11" class="ivy" />
        <div class="rose-wrap">
          <RoseWindow :element="element" :seed="seed" :ignite="element === 'fire'" />
        </div>
        <GlassPlant kind="fern" :element="element" :seed="seed + 2" class="fern" />
        <GlassPlant kind="monstera" :element="element" :seed="seed + 5" class="monstera" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: clamp(8px, 1.6vw, 22px);
}
.panel {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.18fr);
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'words quarry'
    'cta quarry';
  min-height: calc(100svh - 104px);
}
.actions {
  grid-area: cta;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--came);
}

.words {
  grid-area: words;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  padding: clamp(1.75rem, 4.5vw, 4.5rem);
}
h1 {
  font-size: clamp(3rem, 5.6vw, 5.75rem);
  color: var(--color-ruby);
}
[data-element='earth'] h1 { color: #5c3820; }
[data-element='air'] h1 { color: #25336b; }
.line {
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-style: italic;
  line-height: 1.3;
  color: var(--color-ink);
}
.pane-fern {
  position: absolute;
  right: -1.5rem;
  bottom: -2rem;
  height: 42%;
}
.words > :not(.pane-fern) { position: relative; z-index: 1; }
.body {
  max-width: 34rem;
  color: var(--color-ink-soft);
  font-size: 1.15rem;
}

.cta,
.second {
  min-height: 5.25rem;
  padding: 1rem 1.5rem;
}
.cta {
  justify-content: space-between;
  font-size: clamp(1.35rem, 2vw, 1.75rem);
}
.price {
  font-size: 1.1em;
  padding-left: 1rem;
  border-left: 3px solid rgb(23 17 14 / 0.5);
}
.second {
  font-size: 1.1rem;
  color: var(--text-on-room);
}
.second:hover { filter: brightness(1.5); }

.quarry {
  grid-area: quarry;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: clamp(1.5rem, 3vw, 3rem);
  /* diamond quarries: the classic leaded lattice behind the rose */
  background:
    repeating-linear-gradient(62deg, #17110e 0 3px, transparent 3px 64px),
    repeating-linear-gradient(-62deg, #17110e 0 3px, transparent 3px 64px),
    var(--seeds),
    radial-gradient(70% 60% at 55% 45%, #6a2a12, #2a130a 70%);
}
[data-element='earth'] .quarry {
  background:
    repeating-linear-gradient(62deg, #17110e 0 3px, transparent 3px 64px),
    repeating-linear-gradient(-62deg, #17110e 0 3px, transparent 3px 64px),
    var(--seeds),
    radial-gradient(70% 60% at 55% 45%, #5a4416, #221a0a 70%);
}
[data-element='air'] .quarry {
  background:
    repeating-linear-gradient(62deg, #17110e 0 3px, transparent 3px 64px),
    repeating-linear-gradient(-62deg, #17110e 0 3px, transparent 3px 64px),
    var(--seeds),
    radial-gradient(70% 60% at 55% 45%, #2c3f86, #121a38 70%);
}
.rose-wrap {
  position: relative;
  z-index: 1;
  width: min(100%, calc(100svh - 190px), 760px);
}
.ivy {
  position: absolute;
  z-index: 2;
  top: -18px;
  left: -40px;
  width: 62%;
}
.fern {
  position: absolute;
  z-index: 2;
  right: -2%;
  bottom: -6%;
  height: 72%;
}
.monstera {
  position: absolute;
  z-index: 2;
  left: -4%;
  bottom: -8%;
  width: 34%;
  transform: rotate(-16deg);
}

@media (min-width: 1500px) {
  .panel { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }
}

@media (max-width: 860px) {
  .panel {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas: 'quarry' 'words' 'cta';
    min-height: 0;
  }
  .quarry { padding: 0.9rem; }
  .rose-wrap { width: min(78vw, 37svh); }
  .words { padding: 1.3rem 1.3rem 1.3rem; gap: 0.7rem; }
  h1 { font-size: clamp(2.3rem, 10vw, 3.2rem); }
  .line { font-size: 1.3rem; }
  .body { font-size: 1.05rem; }
  .cta { min-height: 4rem; }
  .actions { grid-template-columns: 1fr; }
  .second { min-height: 3.25rem; font-size: 1rem; }
  .fern { height: 64%; right: -8%; }
  .pane-fern { display: none; }
  .monstera { width: 32%; }
}
</style>
