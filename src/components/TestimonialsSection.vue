<script setup>
const testimonials = [
  {
    quote: "I was suffering from chronic back pain for years. After just three sessions with Penny, the relief was remarkable. Her intuitive touch and healing presence made me feel completely safe and understood.",
    name: "Sarah M.",
    location: "Chelmsford",
    service: "Myofascial Release",
  },
  {
    quote: "The shamanic healing session with Penny was profound and transformative. I walked in feeling scattered and disconnected, and left feeling whole again. She is truly gifted.",
    name: "James T.",
    location: "Essex",
    service: "Shamanic Healing",
  },
  {
    quote: "Penny's myofascial release work is unlike anything I've experienced. Gentle, deep, and incredibly effective. My tension headaches have almost completely gone after four sessions.",
    name: "Rachel H.",
    location: "Braintree",
    service: "Myofascial Release",
  },
  {
    quote: "I came to Penny following a recommendation from my osteopath. The combination of bodywork and energetic healing she offers is extraordinary. I feel like a completely different person.",
    name: "Louise K.",
    location: "Chelmsford",
    service: "Combined Session",
  },
]
</script>

<template>
  <section id="testimonials" class="py-24 bg-brown relative overflow-hidden">
    <!-- Soft glow background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      <div class="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gold-light/10 blur-3xl" />
    </div>

    <div class="relative max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="block w-8 h-px bg-gold-light/50" />
          <span class="text-gold-light/90 text-xs tracking-[0.4em] uppercase font-semibold font-body">Stories of Healing</span>
          <span class="block w-8 h-px bg-gold-light/50" />
        </div>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-warm-white mb-4">What Clients Say</h2>
        <div class="w-14 h-0.5 bg-gold mx-auto" />
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="bg-warm-white/6 border border-warm-white/12 backdrop-blur-sm rounded-2xl p-7 hover:bg-warm-white/10 transition-all duration-300"
        >
          <!-- Stars -->
          <div class="flex gap-0.5 mb-4 text-gold text-lg">
            <span v-for="n in 5" :key="n">★</span>
          </div>

          <!-- Quote -->
          <p class="text-warm-white/80 font-body leading-relaxed italic mb-6 text-sm">
            "{{ t.quote }}"
          </p>

          <!-- Attribution -->
          <div class="flex items-center justify-between">
            <div>
              <div class="text-warm-white font-semibold text-sm">{{ t.name }}</div>
              <div class="text-gold-light/65 text-xs mt-0.5">{{ t.location }}</div>
            </div>
            <span class="bg-gold/20 border border-gold/30 text-gold-light px-3 py-1 rounded-full text-xs font-semibold">
              {{ t.service }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
