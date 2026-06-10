<script setup>
const navLinks = [
  { label: 'Home',         href: '#home' },
  { label: 'About Penny',  href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Book a Session', href: '#booking' },
  { label: 'Contact',      href: '#contact' },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-earth">

    <!-- Main footer content -->
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" fill="currentColor" class="w-9 h-9 text-gold">
              <path d="M18 2C18 2 8 14 8 24C8 30 11 35 14 40C14 34 18 30 18 24C18 30 22 34 22 40C25 35 28 30 28 24C28 14 18 2 18 2Z" opacity="0.35"/>
              <path d="M18 8C18 8 11 18 11 26C11 31 13 35 16 42C16 36 18 32 18 26C18 32 20 36 20 42C23 35 25 31 25 26C25 18 18 8 18 8Z" opacity="0.65"/>
              <path d="M18 14C18 14 14 22 14 28C14 32 16 37 18 44C20 37 22 32 22 28C22 22 18 14 18 14Z"/>
              <path d="M13 22C10 18 4 20 2 16C7 14 13 17 18 14" opacity="0.55"/>
              <path d="M23 22C26 18 32 20 34 16C29 14 23 17 18 14" opacity="0.55"/>
            </svg>
            <div>
              <div class="font-heading font-semibold text-warm-white text-lg leading-none">Pheonix</div>
              <div class="text-gold text-xs tracking-[0.35em] uppercase mt-0.5">Healing Practice</div>
            </div>
          </div>
          <p class="text-warm-white/50 font-body text-sm leading-relaxed mt-4">
            Holistic healing for body, mind &amp; spirit.<br />
            Chelmsford, Essex.
          </p>
          <div class="mt-6">
            <a
              href="#booking"
              class="inline-block bg-gold hover:bg-gold-light text-earth px-6 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              Book a Session — £60
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-warm-white font-heading font-semibold text-lg mb-5">Quick Links</h4>
          <ul class="space-y-3">
            <li v-for="link in navLinks" :key="link.label">
              <a
                :href="link.href"
                class="text-warm-white/50 hover:text-gold transition-colors text-sm font-body"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact info -->
        <div>
          <h4 class="text-warm-white font-heading font-semibold text-lg mb-5">Contact</h4>
          <ul class="space-y-4">
            <li>
              <a href="mailto:penny@patch-a-mumma.co.uk"
                class="text-warm-white/50 hover:text-gold transition-colors text-sm font-body break-all">
                penny@patch-a-mumma.co.uk
              </a>
            </li>
            <li>
              <a href="tel:07561702154"
                class="text-warm-white/50 hover:text-gold transition-colors text-sm font-body">
                07561 702 154
              </a>
            </li>
            <li class="text-warm-white/50 text-sm font-body">
              Chelmsford, Essex
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-warm-white/10">
      <div class="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-warm-white/35 text-xs font-body">
          © {{ year }} Pheonix Healing Practice · Penny Theophanous
        </p>
        <p class="text-warm-white/25 text-xs font-body">Made with love in Essex</p>
      </div>
    </div>

  </footer>
</template>
