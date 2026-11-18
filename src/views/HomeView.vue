<script setup>
import ElementHero from '../components/ElementHero.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import HowItWorks from '../components/HowItWorks.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import BookingSection from '../components/BookingSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <ElementHero
    element="fire"
    :seed="7"
    title="Pheonix Healing Practice"
    line="Release the body. Rekindle the spirit."
  >
    <p>
      Myofascial Release and Shamanic Healing with Penny Theophanous, in Chelmsford, Essex.
      Gentle, intuitive work for body, mind and spirit.
    </p>
  </ElementHero>
  <AboutSection />
  <ServicesSection />
  <HowItWorks />
  <TestimonialsSection />
  <BookingSection />
  <ContactSection />
</template>
