<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (!document.querySelector('script[src*="calendly"]')) {
    const s = document.createElement('script')
    s.src = 'https://assets.calendly.com/assets/external/widget.js'
    s.async = true
    document.head.appendChild(s)
  }
})
</script>

<template>
  <section id="booking" class="py-24 bg-gold-pale">
    <div class="max-w-4xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="block w-8 h-px bg-gold" />
          <span class="text-gold text-xs tracking-[0.4em] uppercase font-semibold font-body">Ready to Begin?</span>
          <span class="block w-8 h-px bg-gold" />
        </div>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-brown mb-4">Book Your Session</h2>
        <p class="text-earth/65 max-w-md mx-auto font-body leading-relaxed">
          Select a time that suits you. Sessions are
          <span class="text-gold font-semibold">£60</span> and take place in
          Chelmsford, Essex.
        </p>
        <div class="gold-divider mx-auto mt-6" />
      </div>

      <!-- Calendly widget -->
      <div class="bg-warm-white rounded-3xl shadow-xl overflow-hidden border border-cream-dark">
        <div
          class="calendly-inline-widget"
          data-url="https://calendly.com/penny-theophanous"
          style="min-width: 320px; height: 700px;"
        />
      </div>

      <p class="text-center text-earth/45 text-sm mt-6 font-body">
        Prefer to reach out directly?
        <a href="#contact" class="text-gold hover:text-brown underline transition-colors">Contact Penny here.</a>
      </p>
    </div>
  </section>
</template>
