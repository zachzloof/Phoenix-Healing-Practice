<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', phone: '', service: '', message: '' })
const submitted = ref(false)
const submitting = ref(false)

async function handleSubmit() {
  submitting.value = true
  await new Promise(r => setTimeout(r, 900))
  submitting.value = false
  submitted.value = true
}
</script>

<template>
  <section id="contact" class="py-24 bg-cream">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="block w-8 h-px bg-gold" />
          <span class="text-gold text-xs tracking-[0.4em] uppercase font-semibold font-body">Get in Touch</span>
          <span class="block w-8 h-px bg-gold" />
        </div>
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-brown mb-4">Contact Penny</h2>
        <p class="text-earth/65 max-w-md mx-auto font-body">
          Have a question before booking? I'd love to hear from you.
        </p>
        <div class="gold-divider mx-auto mt-6" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">

        <!-- Contact info -->
        <div class="lg:col-span-2">
          <h3 class="font-heading text-2xl font-semibold text-brown mb-5">Let's Connect</h3>
          <p class="text-earth/65 font-body leading-relaxed mb-8 text-sm">
            Whether you have questions about a therapy, want to discuss your needs, or simply
            want to know if we're the right fit — please reach out. No question is too small.
          </p>

          <div class="space-y-6">
            <!-- Email -->
            <a href="mailto:penny@patch-a-mumma.co.uk" class="flex items-start gap-4 group">
              <div class="w-11 h-11 rounded-full bg-gold-pale border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-300">
                <svg class="w-5 h-5 text-gold group-hover:text-warm-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div class="text-brown font-semibold text-sm mb-0.5">Email</div>
                <div class="text-earth/65 font-body text-sm group-hover:text-gold transition-colors break-all">
                  penny@patch-a-mumma.co.uk
                </div>
              </div>
            </a>

            <!-- Phone -->
            <a href="tel:07561702154" class="flex items-start gap-4 group">
              <div class="w-11 h-11 rounded-full bg-gold-pale border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-300">
                <svg class="w-5 h-5 text-gold group-hover:text-warm-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div class="text-brown font-semibold text-sm mb-0.5">Phone</div>
                <div class="text-earth/65 font-body text-sm group-hover:text-gold transition-colors">07561 702 154</div>
              </div>
            </a>

            <!-- Location -->
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-full bg-gold-pale border border-gold/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <div class="text-brown font-semibold text-sm mb-0.5">Location</div>
                <div class="text-earth/65 font-body text-sm">Chelmsford, Essex</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="lg:col-span-3">
          <div class="bg-warm-white rounded-3xl p-8 shadow-lg border border-cream-dark">

            <!-- Success state -->
            <div v-if="submitted" class="text-center py-10">
              <div class="w-16 h-16 bg-sage-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="font-heading text-2xl font-semibold text-brown mb-2">Message Sent!</h3>
              <p class="text-earth/65 font-body text-sm">Thank you for reaching out. Penny will be in touch with you very soon.</p>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-brown font-semibold text-sm mb-1.5">Your Name *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    class="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-earth placeholder-earth/30 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                </div>
                <div>
                  <label class="block text-brown font-semibold text-sm mb-1.5">Email Address *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    class="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-earth placeholder-earth/30 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-brown font-semibold text-sm mb-1.5">Phone Number</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="07xxx xxx xxx"
                    class="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-earth placeholder-earth/30 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                </div>
                <div>
                  <label class="block text-brown font-semibold text-sm mb-1.5">Interested In</label>
                  <select
                    v-model="form.service"
                    class="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-earth text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  >
                    <option value="" disabled>Select a service…</option>
                    <option value="mfr">Myofascial Release</option>
                    <option value="shamanic">Shamanic Healing</option>
                    <option value="both">Both / Not Sure</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-brown font-semibold text-sm mb-1.5">Your Message *</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Tell me a little about what brings you here…"
                  class="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 text-earth placeholder-earth/30 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="w-full bg-gold hover:bg-brown text-warm-white py-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ submitting ? 'Sending…' : 'Send Message' }}
              </button>

              <p class="text-earth/35 text-xs text-center font-body">
                By submitting you agree to Penny contacting you about your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
