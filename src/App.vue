<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import HowItWorks from './components/HowItWorks.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import BookingSection from './components/BookingSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorks />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>
