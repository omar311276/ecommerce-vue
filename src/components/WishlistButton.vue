<script setup>
import { computed } from 'vue'
import { isSaved, toggleWish } from '../data/wishlist'
import { notify } from '../data/toast'

const props = defineProps({
  id: { type: Number, required: true },
  label: { type: Boolean, default: false } // show text next to the heart
})

const saved = computed(() => isSaved(props.id))

function toggle() {
  const added = toggleWish(props.id)
  notify(added ? 'Saved to your wishlist' : 'Removed from your wishlist', added ? { to: '/wishlist', label: 'View wishlist' } : null)
}
</script>

<template>
  <button
    class="heart"
    :class="{ on: saved, labelled: label }"
    :aria-pressed="saved"
    :aria-label="saved ? 'Remove from wishlist' : 'Add to wishlist'"
    @click.prevent.stop="toggle"
  >
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" stroke-linejoin="round" :fill="saved ? 'currentColor' : 'none'">
      <path d="M12 20.5s-8-4.8-8-11A4.6 4.6 0 0 1 12 6.8 4.6 4.6 0 0 1 20 9.5c0 6.2-8 11-8 11z" />
    </svg>
    <span v-if="label">{{ saved ? 'Saved to wishlist' : 'Add to wishlist' }}</span>
  </button>
</template>
