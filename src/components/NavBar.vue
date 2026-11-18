<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PhoenixMark from './glass/PhoenixMark.vue'

const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => (open.value = false))

const links = [
  { label: 'About Penny', to: '/#about' },
  { label: 'Myofascial Release', to: '/myofascial-release', name: 'mfr' },
  { label: 'Shamanic Healing', to: '/shamanic-healing', name: 'shamanic' },
  { label: 'How it works', to: '/#process' },
  { label: 'Contact', to: '/#contact' },
]
</script>

<template>
  <header class="transom">
    <nav class="came strip" aria-label="Main">
      <RouterLink to="/" class="pane-dim brand" aria-label="Pheonix Healing Practice, home">
        <span class="brand-mark"><PhoenixMark /></span>
        <span class="brand-name">Pheonix<small>Healing Practice</small></span>
      </RouterLink>

      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="pane-dim link"
        :class="{ active: l.name && route.name === l.name }"
        :aria-current="l.name && route.name === l.name ? 'page' : undefined"
      >
        {{ l.label }}
      </RouterLink>

      <RouterLink to="/#booking" class="pane-amber btn-glass book">Book a session</RouterLink>

      <button
        class="pane-dim menu"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <g stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <path :d="open ? 'M5 5l14 14' : 'M4 7h16'" />
            <path v-if="!open" d="M4 12h16" />
            <path :d="open ? 'M19 5L5 19' : 'M4 17h16'" />
          </g>
        </svg>
      </button>
    </nav>

    <div v-show="open" id="mobile-menu" class="came drop">
      <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="pane-dim drop-link" :class="{ active: l.name && route.name === l.name }">
        {{ l.label }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.transom {
  position: sticky;
  top: 0;
  z-index: 50;
}
.strip {
  display: grid;
  grid-template-columns: auto repeat(5, minmax(0, auto)) 1fr auto;
  align-items: stretch;
  padding-block: 6px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.5);
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.45rem 1rem 0.45rem 0.6rem;
  text-decoration: none;
}
.brand-mark { width: 42px; height: 42px; }
.brand-name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1;
  color: var(--color-marigold);
}
.brand-name small {
  display: block;
  margin-top: 0.2rem;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--text-on-room-soft);
}
.link {
  display: flex;
  align-items: center;
  padding: 0 1.05rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}
.link:hover { filter: brightness(1.6) saturate(1.2); }
.link.active,
.drop-link.active {
  background: var(--seeds), linear-gradient(160deg, #f8b54a, #c9661a);
  color: var(--color-lead);
}
/* the empty pane between links and booking is glass too */
.strip::after {
  content: '';
  grid-column: 7;
  grid-row: 1;
  background: var(--seeds), linear-gradient(160deg, #2c160c, #20100a);
}
[data-element='earth'] .strip::after { background: var(--seeds), linear-gradient(160deg, #2a210d, #1d1709); }
[data-element='air'] .strip::after { background: var(--seeds), linear-gradient(160deg, #1a2347, #121935); }
.book {
  grid-column: 8;
  padding: 0 1.4rem;
  font-size: 1.1rem;
}
.menu { display: none; }
.drop { display: none; }
.sr-only {
  position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
}

@media (max-width: 1100px) {
  .strip { grid-template-columns: auto 1fr auto auto; }
  .link { display: none; }
  .strip::after { grid-column: 2; }
  .book { grid-column: 3; padding: 0 1rem; font-size: 1rem; white-space: nowrap; }
  .menu {
    grid-column: 4;
    display: grid;
    place-items: center;
    width: 52px;
    border: 0;
    color: var(--text-on-room);
    cursor: pointer;
  }
  .drop {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: grid;
    padding-top: 0;
    box-shadow: 0 24px 40px rgb(0 0 0 / 0.6);
  }
  .drop[style*='none'] { display: none; }
  .drop-link {
    padding: 0.95rem 1.2rem;
    font-size: 1.1rem;
    text-decoration: none;
  }
}
@media (max-width: 420px) {
  .brand-name small { display: none; }
  .brand { padding-right: 0.7rem; }
  .brand-mark { width: 36px; height: 36px; }
  .brand-name { font-size: 1.15rem; }
  .book { padding: 0 0.8rem; font-size: 0.92rem; }
  .menu { width: 48px; }
}
</style>
