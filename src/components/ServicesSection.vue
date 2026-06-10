<script setup>
const mfrPoints = [
  'Chronic pain & fibromyalgia',
  'Sports injuries & recovery',
  'Postural problems & stiffness',
  'Stress-related tension',
  'Headaches & migraines',
]

const shamanicPoints = [
  'Spiritual disconnection',
  'Emotional trauma & grief',
  'Life transitions & crossroads',
  'Anxiety & low mood',
  'Seeking deeper meaning',
]
</script>

<template>
  <section id="services" class="py-24 bg-gold-pale">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="block w-8 h-px bg-gold" />
          <span class="text-gold text-xs tracking-[0.4em] uppercase font-semibold font-body">What I Offer</span>
          <span class="block w-8 h-px bg-gold" />
        </div>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-brown mb-4">My Services</h2>
        <p class="text-earth/65 max-w-xl mx-auto font-body leading-relaxed">
          Holistic healing that honours your whole self — body, mind, and spirit.
          Every session is tailored to your unique needs.
        </p>
        <div class="gold-divider mx-auto mt-6" />
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <!-- MFR card -->
        <div class="bg-warm-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
          <div class="relative h-64 overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
              alt="Myofascial Release therapy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-earth/65 to-transparent" />
            <div class="absolute bottom-4 left-6">
              <span class="bg-gold text-warm-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md tracking-wide">
                MFR · MER
              </span>
            </div>
          </div>
          <div class="p-8 flex flex-col flex-1">
            <h3 class="font-heading text-2xl font-bold text-brown mb-3">Myofascial Release</h3>
            <div class="gold-divider mb-5" />
            <p class="text-earth/70 font-body leading-relaxed mb-6 text-sm">
              A gentle, hands-on therapy targeting the fascia — the connective tissue that
              surrounds every muscle, bone, nerve and organ. Through sustained, gentle pressure,
              MFR releases restrictions, restoring freedom of movement and addressing the
              root cause of pain rather than just the symptoms.
            </p>
            <div class="mb-6">
              <h4 class="text-brown font-semibold text-xs uppercase tracking-wider mb-3">Ideal for:</h4>
              <ul class="space-y-2">
                <li v-for="pt in mfrPoints" :key="pt" class="flex items-center gap-2.5 text-earth/70 text-sm font-body">
                  <span class="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {{ pt }}
                </li>
              </ul>
            </div>
            <div class="mt-auto pt-5 border-t border-cream-dark flex items-center justify-between">
              <span class="font-heading text-2xl font-bold text-gold">
                £60 <span class="text-earth/40 text-sm font-body font-normal">/ session</span>
              </span>
              <a href="#booking" class="bg-gold hover:bg-brown text-warm-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                Book Now
              </a>
            </div>
          </div>
        </div>

        <!-- Shamanic card -->
        <div class="bg-warm-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
          <div class="relative h-64 overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80"
              alt="Shamanic healing"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-earth/65 to-transparent" />
            <div class="absolute bottom-4 left-6">
              <span class="bg-sage text-warm-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md tracking-wide">
                Shamanic
              </span>
            </div>
          </div>
          <div class="p-8 flex flex-col flex-1">
            <h3 class="font-heading text-2xl font-bold text-brown mb-3">Shamanic Healing</h3>
            <div class="gold-divider mb-5" />
            <p class="text-earth/70 font-body leading-relaxed mb-6 text-sm">
              Drawing on humanity's oldest healing traditions, shamanic healing recognises
              that illness often has a spiritual dimension alongside the physical. Using
              rhythmic sound, sacred practices, and deep intuitive guidance, this work
              restores balance and wholeness — reconnecting you to your inner wisdom and
              the healing power of the natural world.
            </p>
            <div class="mb-6">
              <h4 class="text-brown font-semibold text-xs uppercase tracking-wider mb-3">Ideal for:</h4>
              <ul class="space-y-2">
                <li v-for="pt in shamanicPoints" :key="pt" class="flex items-center gap-2.5 text-earth/70 text-sm font-body">
                  <span class="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                  {{ pt }}
                </li>
              </ul>
            </div>
            <div class="mt-auto pt-5 border-t border-cream-dark flex items-center justify-between">
              <span class="font-heading text-2xl font-bold text-gold">
                £60 <span class="text-earth/40 text-sm font-body font-normal">/ session</span>
              </span>
              <a href="#booking" class="bg-sage hover:bg-sage/80 text-warm-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                Book Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
