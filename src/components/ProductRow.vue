<script setup>
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

defineProps({
  title: { type: String, required: true },
  products: { type: Array, required: true },
  to: { type: [String, Object], default: null },
  toLabel: { type: String, default: 'See all' }
})

const track = ref(null)

function scroll(dir) {
  const el = track.value
  el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
}
</script>

<template>
  <section class="row-box">
    <div class="row-head">
      <h2>{{ title }}</h2>
      <RouterLink v-if="to" :to="to" class="text-link">{{ toLabel }}</RouterLink>
    </div>

    <div class="row-wrap">
      <button class="row-arrow left" aria-label="Scroll left" @click="scroll(-1)">‹</button>
      <div ref="track" class="row-track">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
      <button class="row-arrow right" aria-label="Scroll right" @click="scroll(1)">›</button>
    </div>
  </section>
</template>
