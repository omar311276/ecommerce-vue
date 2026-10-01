import { reactive } from 'vue'

export const toasts = reactive([])
let nextId = 1

// notify('Added to cart', { to: '/cart', label: 'View cart' })
export function notify(text, action = null) {
  const t = { id: nextId++, text, action }
  toasts.push(t)
  setTimeout(() => {
    const i = toasts.findIndex((x) => x.id === t.id)
    if (i !== -1) toasts.splice(i, 1)
  }, 3200)
}
