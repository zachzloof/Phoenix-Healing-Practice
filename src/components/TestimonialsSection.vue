<script setup>
import { TESTIMONIALS } from '../content/site.js'
import ChakraJewel from './glass/ChakraJewel.vue'
import GlassPlant from './glass/GlassPlant.vue'

// Each quote hangs from the rail like a suncatcher in a window.
// NOTE: TESTIMONIALS are placeholders (see content/site.js) until real ones arrive.
const tints = ['amber', 'rose', 'moss', 'sky']
</script>

<template>
  <section id="testimonials" class="section" aria-labelledby="t-title">
    <GlassPlant kind="fern" element="fire" :seed="81" class="margin-plant" style="left: 0; bottom: 0; height: 26rem" />
    <GlassPlant kind="fern" element="fire" :seed="82" class="margin-plant" flip style="right: 0; bottom: 2rem; height: 20rem" />
    <div class="wrap">
      <header class="section-head">
        <h2 id="t-title">What clients say</h2>
      </header>
      <div class="rail" aria-hidden="true" />
      <ul class="hangers" tabindex="0" aria-label="Client testimonials">
        <li v-for="(t, i) in TESTIMONIALS" :key="t.name" class="hanger" :class="tints[i % 4]" :data-placeholder="t.placeholder || undefined">
          <figure class="catcher">
            <ChakraJewel :chakra="[2, 0, 3, 4][i % 4]" :size="22" class="top" />
            <blockquote>“{{ t.quote }}”</blockquote>
            <figcaption>
              <strong>{{ t.name }}</strong>, {{ t.place }}
              <span>{{ t.service }}</span>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.rail {
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(#4a3a30, #17110e 70%);
  box-shadow: 0 6px 14px rgb(0 0 0 / 0.5);
}
.hangers {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
  margin: 0;
  padding: 0;
  list-style: none;
}
.hanger {
  position: relative;
  padding-top: var(--drop, 2.5rem);
}
.hanger:nth-child(2) { --drop: 4.5rem; }
.hanger:nth-child(3) { --drop: 1.5rem; }
.hanger:nth-child(4) { --drop: 3.5rem; }
/* the chain: little links from rail to pane */
.hanger::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: var(--drop, 2.5rem);
  translate: -50% 0;
  background: repeating-linear-gradient(#8a7a6a 0 5px, #2a201a 5px 8px);
  border-radius: 2px;
}
.catcher {
  position: relative;
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 6.2rem 1.8rem 1.8rem;
  border: 7px solid #17110e;
  border-radius: 50% 50% 10px 10px / 5.5rem 5.5rem 10px 10px;
  color: var(--color-ink);
  background: var(--seeds), var(--tint);
  box-shadow: 0 20px 40px rgb(0 0 0 / 0.45), inset 0 0 30px rgb(255 255 255 / 0.35);
  transition: filter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.catcher:hover { filter: brightness(1.08) saturate(1.1); }
.top {
  position: absolute;
  top: 0.7rem;
  left: 50%;
  translate: -50% 0;
}
.amber { --tint: linear-gradient(170deg, #fdf0cf, #f6d38a); }
.rose { --tint: linear-gradient(170deg, #fbe7df, #f0b9a6); }
.moss { --tint: linear-gradient(170deg, #eef3dc, #c8d9a3); }
.sky { --tint: linear-gradient(170deg, #eaf4f9, #b9d9ec); }
blockquote {
  margin: 0;
  font-style: italic;
  font-size: 1.08rem;
  line-height: 1.5;
}
figcaption { font-size: 1rem; color: var(--color-ink-soft); }
figcaption strong { color: var(--color-ink); }
figcaption span { display: block; font-size: 0.92rem; }

@media (max-width: 1000px) {
  .hangers { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 560px) {
  .hangers {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 84%;
    gap: 0.9rem;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 8%;
    padding: 0 8% 1.5rem;
    margin-inline: calc(-1 * clamp(8px, 1.6vw, 22px));
    scrollbar-width: none;
  }
  .hangers::-webkit-scrollbar { display: none; }
  .hanger { scroll-snap-align: center; --drop: 1.75rem !important; }
  .hanger:nth-child(even) { --drop: 2.75rem !important; }
  .catcher { height: 100%; box-sizing: border-box; align-content: start; padding: 5.6rem 1.4rem 1.5rem; }
  .hangers:focus-visible { outline-offset: -3px; }
}
</style>
