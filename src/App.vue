<script setup>
import { watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'

const route = useRoute()
watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    setTimeout(() => ScrollTrigger.refresh(), 120)
  },
)
</script>

<template>
  <!-- shared glass definitions -->
  <svg width="0" height="0" style="position: absolute" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="jewel-shine" cx="38%" cy="34%" r="70%">
        <stop offset="0" stop-color="#fff" stop-opacity=".75" />
        <stop offset=".3" stop-color="#fff" stop-opacity=".12" />
        <stop offset="1" stop-color="#000" stop-opacity=".4" />
      </radialGradient>
    </defs>
  </svg>

  <a href="#main" class="skip">Skip to content</a>
  <NavBar />
  <main id="main">
    <RouterView v-slot="{ Component }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </main>
  <FooterSection />
</template>

<style scoped>
.skip {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  padding: 0.75rem 1rem;
  background: var(--color-amber);
  color: var(--color-lead);
  font-weight: 700;
}
.skip:focus { top: 1rem; }
</style>
