<script setup>
import ChakraJewel from './ChakraJewel.vue'
</script>

<template>
  <!-- a soldered came with the seven chakras set into it, root to crown -->
  <div class="rule" aria-hidden="true">
    <span class="came-line" />
    <ChakraJewel v-for="i in 7" :key="i" :chakra="i - 1" :size="20" />
    <span class="came-line" />
  </div>
</template>

<style scoped>
.rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: min(100%, 34rem);
  margin-inline: auto;
}
.came-line {
  flex: 1;
  height: 5px;
  border-radius: 3px;
  background: linear-gradient(#3a2c24, #17110e 60%);
  box-shadow: 0 1px 0 rgb(255 255 255 / 0.06);
}
</style>
