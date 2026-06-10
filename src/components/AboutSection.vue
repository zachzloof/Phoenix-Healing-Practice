<template>
  <section id="about" class="py-24 bg-cream">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <!-- Image column -->
        <div class="relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=80"
              alt="Penny Theophanous – Healer"
              class="w-full h-[520px] object-cover object-top"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-brown/40 via-transparent to-transparent" />
          </div>
          <!-- Offset frame -->
          <div class="absolute -bottom-5 -right-5 w-full h-full border-2 border-gold/35 rounded-2xl -z-10 pointer-events-none" />
          <!-- Floating badge -->
          <div class="absolute -bottom-7 -left-5 bg-cream shadow-xl border border-cream-dark rounded-2xl px-6 py-4">
            <div class="text-center">
              <div class="font-heading text-3xl font-bold text-gold">10+</div>
              <div class="text-brown-light text-xs font-semibold tracking-wide uppercase mt-0.5">Years Experience</div>
            </div>
          </div>
        </div>

        <!-- Text column -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-gold text-xs tracking-[0.4em] uppercase font-semibold">About</span>
            <span class="block w-8 h-px bg-gold" />
          </div>

          <h2 class="font-heading text-4xl md:text-5xl font-bold text-brown leading-tight mb-6">
            Meet Penny<br />
            <em class="text-gold not-italic">Theophanous</em>
          </h2>

          <div class="gold-divider mb-8" />

          <div class="space-y-4 text-earth/75 leading-relaxed font-body text-base">
            <p>
              My name is Penny Theophanous, and I am a certified practitioner in Myofascial
              Release and Shamanic Healing, based in the heart of Chelmsford, Essex.
            </p>
            <p>
              My journey into healing began through my own experience of chronic pain and
              disconnection. Through the transformative power of myofascial release and
              shamanic practice, I found not just relief — but a profound reconnection with
              my body, mind, and spirit.
            </p>
            <p>
              I believe true healing works on every level. Whether you come to me with physical
              tension, emotional blocks, or a sense of feeling lost, my approach is always
              gentle, intuitive, and deeply respectful of your individual journey.
            </p>
            <p class="font-heading text-brown italic text-lg leading-snug">
              "Each session is a sacred space where you are truly seen, heard, and held."
            </p>
          </div>

          <!-- Credential pills -->
          <div class="mt-8 flex flex-wrap gap-3">
            <span class="bg-gold-pale border border-gold/30 text-brown px-4 py-2 rounded-full text-sm font-semibold">
              Certified MFR Practitioner
            </span>
            <span class="bg-sage-light/25 border border-sage/30 text-sage px-4 py-2 rounded-full text-sm font-semibold">
              Shamanic Healer
            </span>
            <span class="bg-gold-pale border border-gold/30 text-brown px-4 py-2 rounded-full text-sm font-semibold">
              Chelmsford, Essex
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
