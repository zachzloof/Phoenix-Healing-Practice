<script setup>
import { computed } from 'vue'
import { CHAKRAS } from '../../lib/glass.js'

// A glass cabochon set in lead. `chakra` is 0 (root) … 6 (crown).
const props = defineProps({
  chakra: { type: Number, default: 0 },
  size: { type: [Number, String], default: 18 },
  title: { type: String, default: '' },
})
const c = computed(() => CHAKRAS[((props.chakra % 7) + 7) % 7])
</script>

<template>
  <svg
    class="jewel"
    viewBox="0 0 40 40"
    :width="size"
    :height="size"
    :role="title ? 'img' : undefined"
    :aria-label="title || undefined"
    :aria-hidden="title ? undefined : 'true'"
  >
    <circle cx="20" cy="20" r="19" fill="#17110e" />
    <circle cx="20" cy="20" r="14.5" :fill="c.color" />
    <circle cx="20" cy="20" r="14.5" fill="url(#jewel-shine)" />
    <ellipse cx="15" cy="14" rx="4.5" ry="3" fill="#fff" opacity=".7" />
  </svg>
</template>

<style scoped>
.jewel {
  display: inline-block;
  flex: none;
  vertical-align: middle;
}
</style>
