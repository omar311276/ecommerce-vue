import { reactive, computed, watch } from 'vue'

// Demo accounts only. Everything lives in this browser's localStorage,
// so there is no real security here. A real shop needs a backend.

const USERS = 'kolo-users'
const SESSION = 'kolo-session'
const ORDERS = 'kolo-orders'

function read(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key))
    return v ?? fallback
  } catch {
    return fallback
  }
}

const users = reactive(read(USERS, {}))
const ordersByUser = reactive(read(ORDERS, {}))
const session = reactive({ email: read(SESSION, null) })

watch(users, (v) => localStorage.setItem(USERS, JSON.stringify(v)), { deep: true })
watch(ordersByUser, (v) => localStorage.setItem(ORDERS, JSON.stringify(v)), { deep: true })
watch(() => session.email, (v) => localStorage.setItem(SESSION, JSON.stringify(v)))

async function hash(text) {
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  return btoa(text) // plain http fallback, still only a demo
}

export const user = computed(() => (session.email ? users[session.email] || null : null))
export const orders = computed(() => (session.email ? ordersByUser[session.email] || [] : []))

export async function register({ name, email, password }) {
  email = email.trim().toLowerCase()
  if (users[email]) throw new Error('An account with this email already exists. Sign in instead.')
  if (password.length < 6) throw new Error('Use at least 6 characters for the password.')
  users[email] = { name: name.trim(), email, phone: '', address: '', city: '', hash: await hash(email + password) }
  session.email = email
}

export async function login({ email, password }) {
  email = email.trim().toLowerCase()
  const found = users[email]
  if (!found || found.hash !== (await hash(email + password))) {
    throw new Error('The email or password is not right. Try again.')
  }
  session.email = email
}

export function logout() {
  session.email = null
}

export function updateProfile(patch) {
  if (user.value) Object.assign(users[session.email], patch)
}

export function saveOrder(order) {
  if (!session.email) return
  if (!ordersByUser[session.email]) ordersByUser[session.email] = []
  ordersByUser[session.email].unshift(order)
}
