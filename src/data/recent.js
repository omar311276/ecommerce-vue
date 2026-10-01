import { reactive, watch } from 'vue'

const KEY = 'kolo-recent'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export const recent = reactive({ ids: load() })

watch(() => recent.ids, (ids) => localStorage.setItem(KEY, JSON.stringify(ids)), { deep: true })

export function markViewed(id) {
  recent.ids = [id, ...recent.ids.filter((x) => x !== id)].slice(0, 10)
}
