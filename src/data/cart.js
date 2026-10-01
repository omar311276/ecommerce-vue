import { reactive, computed, watch } from 'vue'
import { getProduct } from './products'

function load() {
  try {
    return JSON.parse(localStorage.getItem('kolo-cart')) || []
  } catch {
    return []
  }
}

// items look like { id, qty }
const state = reactive({ items: load() })

watch(
  () => state.items,
  (items) => localStorage.setItem('kolo-cart', JSON.stringify(items)),
  { deep: true }
)

export const FREE_SHIPPING_FROM = 50
const SHIPPING_FEE = 4.99

export const lines = computed(() =>
  state.items
    .map((i) => ({ product: getProduct(i.id), qty: i.qty }))
    .filter((l) => l.product)
)

export const cartCount = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
export const subtotal = computed(() => lines.value.reduce((s, l) => s + l.product.price * l.qty, 0))
export const shipping = computed(() =>
  subtotal.value === 0 || subtotal.value >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
)
export const total = computed(() => subtotal.value + shipping.value)

export function addToCart(id, qty = 1) {
  const found = state.items.find((i) => i.id === id)
  if (found) found.qty = Math.min(found.qty + qty, 10)
  else state.items.push({ id, qty: Math.min(qty, 10) })
}

export function setQty(id, qty) {
  const found = state.items.find((i) => i.id === id)
  if (found) found.qty = Math.max(1, Math.min(qty, 10))
}

export function removeFromCart(id) {
  state.items = state.items.filter((i) => i.id !== id)
}

export function clearCart() {
  state.items = []
}
