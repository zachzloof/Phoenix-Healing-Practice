<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1920&q=80')"
    />
    <!-- Layered warm overlays -->
    <div class="absolute inset-0 bg-gradient-to-b from-earth/75 via-brown/55 to-earth/85" />
    <div class="absolute inset-0 bg-gold/15" />

    <!-- Bottom wave into next section -->
    <div class="absolute bottom-0 inset-x-0 pointer-events-none">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full">
        <path d="M0,80 C480,10 960,10 1440,80 L1440,80 L0,80 Z" fill="#FBF4E3"/>
      </svg>
    </div>

    <!-- Hero content -->
    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
      <!-- Eyebrow -->
      <div class="flex items-center justify-center gap-4 mb-8 fade-up">
        <span class="block w-14 h-px bg-gold-light/60" />
        <span class="text-gold-light/90 text-xs tracking-[0.45em] uppercase font-body font-semibold">Chelmsford, Essex</span>
        <span class="block w-14 h-px bg-gold-light/60" />
      </div>

      <!-- Main title -->
      <h1 class="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-warm-white leading-tight mb-6 fade-up-delay-1">
        Pheonix<br />
        <em class="text-gold-light not-italic">Healing Practice</em>
      </h1>

      <!-- Subtitle -->
      <p class="font-body text-warm-white/80 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed fade-up-delay-2">
        Myofascial Release &amp; Shamanic Healing<br class="hidden sm:block" />
        with <span class="text-gold-light font-semibold">Penny Theophanous</span>
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center fade-up-delay-3">
        <a
          href="#booking"
          class="bg-gold hover:bg-gold-light text-warm-white hover:text-earth px-9 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          Book Your Session
        </a>
        <a
          href="#services"
          class="border-2 border-warm-white/50 hover:border-gold-light text-warm-white hover:text-gold-light px-9 py-4 rounded-full font-semibold text-base transition-all duration-300 backdrop-blur-sm"
        >
          Explore Services
        </a>
      </div>

      <!-- Price pill -->
      <div class="mt-12 inline-flex items-center gap-2.5 bg-warm-white/10 backdrop-blur-sm border border-warm-white/20 px-6 py-3 rounded-full fade-up-delay-3">
        <span class="font-heading text-2xl font-bold text-gold-light">£60</span>
        <span class="text-warm-white/70 text-sm font-body">per session</span>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-20 inset-x-0 flex flex-col items-center gap-2 text-warm-white/40 pointer-events-none">
      <span class="text-[10px] tracking-[0.4em] uppercase font-body">Scroll</span>
      <div class="w-px h-8 bg-gold-light/30 animate-pulse" />
    </div>
  </section>
</template>
