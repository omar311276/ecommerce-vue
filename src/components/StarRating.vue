<script setup>
defineProps({
  rating: { type: Number, required: true },
  count: { type: Number, default: 0 }
})
</script>

<template>
  <span class="rating">
    <span class="stars" aria-hidden="true">
      ★★★★★
      <span class="stars-fill" :style="{ width: (rating / 5) * 100 + '%' }">★★★★★</span>
    </span>
    <span class="sr-only">{{ rating }} out of 5 stars</span>
    <span v-if="count" class="rating-count">{{ count.toLocaleString() }}</span>
  </span>
</template>
