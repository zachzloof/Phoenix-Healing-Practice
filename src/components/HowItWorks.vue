<script setup>
const steps = [
  {
    number: '01',
    title: 'Book Your Session',
    description: 'Choose a time that works for you through our simple online booking system. Sessions take place in Chelmsford, Essex.',
  },
  {
    number: '02',
    title: 'Your First Conversation',
    description: 'We begin with a gentle conversation about what brings you here, your health history, and what you hope to experience.',
  },
  {
    number: '03',
    title: 'The Session',
    description: 'You remain fully clothed throughout. Penny works with sensitivity and presence, listening to your body\'s own wisdom.',
  },
  {
    number: '04',
    title: 'Integration & Aftercare',
    description: 'After your session we discuss what arose and how to support your ongoing healing journey. You are never alone in this process.',
  },
]
</script>

<template>
  <section id="how-it-works" class="py-24 bg-cream">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="block w-8 h-px bg-gold" />
          <span class="text-gold text-xs tracking-[0.4em] uppercase font-semibold font-body">The Process</span>
          <span class="block w-8 h-px bg-gold" />
        </div>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-brown mb-4">How It Works</h2>
        <p class="text-earth/65 max-w-sm mx-auto font-body">Your healing journey begins with a single, courageous step.</p>
        <div class="gold-divider mx-auto mt-6" />
      </div>

      <!-- Steps grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="relative flex flex-col items-center text-center group"
        >
          <!-- Connector (desktop only, not on last) -->
          <div
            v-if="i < steps.length - 1"
            class="hidden lg:block absolute top-10 left-1/2 w-full h-px bg-gold/20 -z-10"
          />

          <!-- Circle -->
          <div class="w-20 h-20 rounded-full bg-gold-pale border-2 border-gold/40 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:border-gold transition-all duration-300 flex-shrink-0">
            <span class="font-heading text-2xl font-bold text-gold group-hover:text-warm-white transition-colors duration-300">
              {{ step.number }}
            </span>
          </div>

          <h3 class="font-heading text-xl font-semibold text-brown mb-3">{{ step.title }}</h3>
          <p class="text-earth/60 text-sm font-body leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
