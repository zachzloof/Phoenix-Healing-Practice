<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const links = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'How It Works',href: '#how-it-works' },
  { label: 'Book',        href: '#booking' },
  { label: 'Contact',     href: '#contact' },
]

function onScroll() { scrolled.value = window.scrollY > 60 }
function close() { mobileOpen.value = false }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-500',
      scrolled ? 'bg-cream shadow-lg py-3' : 'bg-transparent py-5',
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#home" class="flex items-center gap-3" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" fill="currentColor"
          :class="['w-9 h-9 transition-colors', scrolled ? 'text-gold' : 'text-gold-light']">
          <path d="M18 2C18 2 8 14 8 24C8 30 11 35 14 40C14 34 18 30 18 24C18 30 22 34 22 40C25 35 28 30 28 24C28 14 18 2 18 2Z" opacity="0.35"/>
          <path d="M18 8C18 8 11 18 11 26C11 31 13 35 16 42C16 36 18 32 18 26C18 32 20 36 20 42C23 35 25 31 25 26C25 18 18 8 18 8Z" opacity="0.65"/>
          <path d="M18 14C18 14 14 22 14 28C14 32 16 37 18 44C20 37 22 32 22 28C22 22 18 14 18 14Z"/>
          <path d="M13 22C10 18 4 20 2 16C7 14 13 17 18 14" opacity="0.55"/>
          <path d="M23 22C26 18 32 20 34 16C29 14 23 17 18 14" opacity="0.55"/>
        </svg>
        <div>
          <div :class="['font-heading font-semibold text-lg leading-none transition-colors', scrolled ? 'text-brown' : 'text-warm-white']">
            Pheonix
          </div>
          <div :class="['text-xs tracking-[0.35em] uppercase transition-colors', scrolled ? 'text-gold' : 'text-gold-light']">
            Healing Practice
          </div>
        </div>
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :class="['text-sm font-semibold tracking-wide transition-colors hover:text-gold', scrolled ? 'text-brown' : 'text-warm-white/90']"
        >
          {{ link.label }}
        </a>
        <a
          href="#booking"
          class="bg-gold hover:bg-brown text-warm-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Book Now
        </a>
      </div>

      <!-- Hamburger -->
      <button
        class="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <span :class="['block w-6 h-0.5 transition-all duration-300 origin-center', scrolled ? 'bg-brown' : 'bg-warm-white', mobileOpen ? 'rotate-45 translate-y-2' : '']" />
        <span :class="['block w-6 h-0.5 transition-all duration-300', scrolled ? 'bg-brown' : 'bg-warm-white', mobileOpen ? 'opacity-0 scale-x-0' : '']" />
        <span :class="['block w-6 h-0.5 transition-all duration-300 origin-center', scrolled ? 'bg-brown' : 'bg-warm-white', mobileOpen ? '-rotate-45 -translate-y-2' : '']" />
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      :class="['md:hidden overflow-hidden transition-all duration-300 bg-cream border-t', mobileOpen ? 'max-h-96 border-cream-dark' : 'max-h-0 border-transparent']"
    >
      <div class="px-6 py-5 flex flex-col gap-1">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="text-brown font-semibold py-2.5 border-b border-cream-dark hover:text-gold transition-colors"
          @click="close"
        >
          {{ link.label }}
        </a>
        <a
          href="#booking"
          class="mt-3 bg-gold hover:bg-brown text-warm-white py-3 rounded-full text-sm font-semibold text-center transition-colors"
          @click="close"
        >
          Book Now
        </a>
      </div>
    </div>
  </nav>
</template>
