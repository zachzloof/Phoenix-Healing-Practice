<script setup>
import PhoenixMark from './glass/PhoenixMark.vue'
import GlassPlant from './glass/GlassPlant.vue'
import ChakraRule from './glass/ChakraRule.vue'
import { CONTACT } from '../content/site.js'

const links = [
  { label: 'About Penny', to: '/#about' },
  { label: 'Myofascial Release', to: '/myofascial-release' },
  { label: 'Shamanic Healing', to: '/shamanic-healing' },
  { label: 'How it works', to: '/#process' },
  { label: 'Book a session', to: '/#booking' },
  { label: 'Contact', to: '/#contact' },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <GlassPlant kind="ivy" element="fire" :seed="61" class="ivy" />
    <div class="came grid">
      <div class="pane-dim brand">
        <span class="mark"><PhoenixMark /></span>
        <p class="name">Phoenix Healing Practice</p>
        <p class="tag">Holistic healing for body, mind and spirit in {{ CONTACT.location }}.</p>
        <RouterLink to="/#booking" class="pane-amber btn-glass book">Book a session · {{ CONTACT.price }}</RouterLink>
      </div>
      <nav class="pane-dim col" aria-label="Footer">
        <h2>Explore</h2>
        <ul><li v-for="l in links" :key="l.to"><RouterLink :to="l.to">{{ l.label }}</RouterLink></li></ul>
      </nav>
      <div class="pane-dim col">
        <h2>Contact</h2>
        <ul>
          <li><a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></li>
          <li><a :href="CONTACT.phoneHref">{{ CONTACT.phone }}</a></li>
          <li>{{ CONTACT.location }}</li>
        </ul>
      </div>
    </div>
    <div class="base">
      <ChakraRule />
      <p>© {{ year }} Phoenix Healing Practice · Penny Theophanous · Made with love in Essex</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: clamp(5rem, 9vw, 7rem) clamp(10px, 1.6vw, 22px) 2rem;
}
.ivy {
  position: absolute;
  z-index: 0;
  top: 0.5rem;
  left: 50%;
  width: min(34rem, 90vw);
  translate: -50% 0;
}
.grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  max-width: 78rem;
  margin-inline: auto;
}
.brand,
.col { padding: clamp(1.6rem, 3vw, 2.4rem); }
.brand { display: grid; gap: 0.8rem; align-content: start; }
.mark { width: 64px; height: 64px; }
.name { font-family: var(--font-display); font-size: 1.7rem; color: var(--color-marigold); }
.tag { color: var(--text-on-room-soft); }
.book { justify-self: start; margin-top: 0.6rem; padding: 0.9rem 1.3rem; border: 3px solid #17110e; font-size: 1.1rem; }
h2 { font-size: 1.35rem; color: var(--heading); margin-bottom: 1rem; }
ul { display: grid; gap: 0.6rem; margin: 0; padding: 0; list-style: none; color: var(--text-on-room-soft); }
.col a { color: var(--text-on-room-soft); text-decoration: none; overflow-wrap: anywhere; }
.col a:hover { color: var(--color-marigold); text-decoration: underline; text-underline-offset: 0.2em; }
.base {
  display: grid;
  gap: 1.2rem;
  justify-items: center;
  max-width: 78rem;
  margin: 2.5rem auto 0;
  text-align: center;
  font-size: 0.95rem;
  color: var(--text-on-room-soft);
}

@media (max-width: 860px) {
  .grid { grid-template-columns: 1fr; }
  ul { gap: 0.15rem; }
  .col a { display: inline-block; padding-block: 0.4rem; }
  .base { padding-inline: 16px; }
}
</style>
