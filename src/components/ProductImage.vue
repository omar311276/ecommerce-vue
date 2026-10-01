<script setup>
import { ref, computed, watch } from 'vue'

// `src` is one link or a list of links. If one fails to load, the next is tried.
const props = defineProps({
  src: { type: [String, Array], required: true },
  alt: { type: String, default: '' }
})

const list = computed(() => (Array.isArray(props.src) ? props.src : [props.src]))
const tried = ref(0)
const current = computed(() => list.value[tried.value])

watch(list, () => (tried.value = 0))
</script>

<template>
  <img
    v-if="current"
    :key="current"
    class="pimg"
    :src="current"
    :alt="alt"
    loading="lazy"
    @error="tried++"
  />
  <div v-else class="pimg pimg-fallback" role="img" :aria-label="alt">
    <span>{{ alt.charAt(0) }}</span>
  </div>
</template>
