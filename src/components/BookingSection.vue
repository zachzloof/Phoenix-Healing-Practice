<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CONTACT } from '../content/site.js'
import ChakraRule from './glass/ChakraRule.vue'
import GlassPlant from './glass/GlassPlant.vue'

// Calendly's widget.js only auto-initialises on first load, so we always
// initialise our own embed; that keeps it working after route changes too.
const embed = ref(null)
const failed = ref(false)

function init() {
  if (!embed.value || !window.Calendly) return
  embed.value.innerHTML = ''
  window.Calendly.initInlineWidget({ url: CONTACT.calendly, parentElement: embed.value })
}

// Load Calendly (a heavy third-party iframe) only as the visitor nears the
// booking section, so phones don't pay for it on first paint.
function load() {
  if (window.Calendly) return init()
  let s = document.querySelector('script[data-calendly]')
  if (!s) {
    s = document.createElement('script')
    s.src = 'https://assets.calendly.com/assets/external/widget.js'
    s.async = true
    s.dataset.calendly = ''
    document.head.appendChild(s)
  }
  s.addEventListener('load', init, { once: true })
  s.addEventListener('error', () => (failed.value = true), { once: true })
}

let io
onMounted(() => {
  if (!('IntersectionObserver' in window)) return load()
  io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      load()
    },
    { rootMargin: '900px 0px' },
  )
  io.observe(embed.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="booking" class="section" aria-labelledby="booking-title">
    <GlassPlant kind="pothos" element="fire" :seed="95" class="margin-plant" style="left: 2%; top: 0; height: 28rem" />
    <GlassPlant kind="fern" element="fire" :seed="96" class="margin-plant" flip style="right: 1%; bottom: 2rem; height: 22rem" />
    <div class="wrap">
      <header class="section-head">
        <h2 id="booking-title">Book a session</h2>
        <p>
          Choose a time that suits you. Sessions are <strong>{{ CONTACT.price }}</strong> and take
          place in {{ CONTACT.location }}.
        </p>
        <ChakraRule />
      </header>

      <div class="came frame">
        <div class="pane-clear cal">
          <div ref="embed" class="embed" />
          <p v-if="failed" class="fallback">
            The booking calendar couldn't load. Please
            <a :href="`mailto:${CONTACT.email}`">email Penny</a> or call
            <a :href="CONTACT.phoneHref">{{ CONTACT.phone }}</a> to book.
          </p>
        </div>
      </div>
      <p class="aside">
        Calendar not showing?
        <a :href="CONTACT.calendly" target="_blank" rel="noopener">Open Penny's booking page</a>.
        Prefer to talk first?
        <RouterLink to="/#contact">Send Penny a message</RouterLink>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.section-head strong { color: var(--color-marigold); font-weight: 700; }
.frame {
  max-width: 64rem;
  margin-inline: auto;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.04), 0 0 90px rgb(240 145 42 / 0.28), 0 30px 60px -20px rgb(0 0 0 / 0.7);
}
.cal { min-height: 700px; }
.embed { min-width: 320px; height: 700px; }
.fallback { padding: 2rem; font-size: 1.15rem; }
.fallback a { color: var(--color-ember); font-weight: 700; }
.aside {
  margin-top: 1.6rem;
  padding-inline: 16px;
  text-align: center;
  color: var(--text-on-room-soft);
}
.aside a {
  color: var(--color-marigold);
  text-underline-offset: 0.2em;
  text-decoration-thickness: 2px;
}
@media (max-width: 1100px) {
  .margin-plant { display: none !important; }
}
</style>
