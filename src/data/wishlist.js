import { reactive, computed, watch } from 'vue'
import { user } from './auth'

const keyFor = (email) => 'kolo-wishlist-' + (email || 'guest')

function load(email) {
  try {
    return JSON.parse(localStorage.getItem(keyFor(email))) || []
  } catch {
    return []
  }
}

const state = reactive({ ids: load(user.value?.email) })

// Signing in brings over whatever was saved as a guest. Signing out goes back to the guest list.
watch(
  () => user.value?.email,
  (email, before) => {
    const guestItems = before ? [] : state.ids
    state.ids = [...new Set([...load(email), ...guestItems])]
  }
)

watch(
  () => state.ids,
  (ids) => localStorage.setItem(keyFor(user.value?.email), JSON.stringify(ids)),
  { deep: true }
)

export const wishlistIds = computed(() => state.ids)
export const wishlistCount = computed(() => state.ids.length)

export function isSaved(id) {
  return state.ids.includes(id)
}

// returns true when the product was added, false when removed
export function toggleWish(id) {
  if (isSaved(id)) {
    state.ids = state.ids.filter((x) => x !== id)
    return false
  }
  state.ids = [id, ...state.ids]
  return true
}

export function removeWish(id) {
  state.ids = state.ids.filter((x) => x !== id)
}
