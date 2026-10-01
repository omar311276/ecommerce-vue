<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cartCount } from '../data/cart'
import { wishlistCount } from '../data/wishlist'
import { user } from '../data/auth'
import { categories, products } from '../data/products'

const route = useRoute()
const router = useRouter()

const q = ref(route.query.q || '')
const cat = ref(route.query.cat || 'All')
const open = ref(false)

// keep the search box in sync with the url (back button, links)
watch(() => route.query, (query) => {
  q.value = query.q || ''
  cat.value = query.cat || 'All'
})

// close the suggestions when moving to another page
watch(() => route.fullPath, () => (open.value = false))

const suggestions = computed(() => {
  const text = q.value.trim().toLowerCase()
  if (text.length < 2) return []
  return products
    .filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(text))
    .slice(0, 6)
})

function search() {
  open.value = false
  const query = {}
  if (q.value.trim()) query.q = q.value.trim()
  if (cat.value !== 'All') query.cat = cat.value
  router.push({ path: '/products', query })
}

function closeSoon() {
  // wait a moment so a click on a suggestion still registers
  setTimeout(() => (open.value = false), 150)
}

const firstName = computed(() => user.value?.name.split(' ')[0])
</script>

<template>
  <header class="header">
    <div class="top">
      <div class="wrap top-inner">
        <RouterLink to="/" class="brand">Kolo</RouterLink>

        <form class="search" role="search" @submit.prevent="search">
          <select v-model="cat" aria-label="Search category">
            <option value="All">All</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
          <input
            v-model="q"
            type="search"
            placeholder="Search Kolo"
            aria-label="Search"
            autocomplete="off"
            @focus="open = true"
            @input="open = true"
            @blur="closeSoon"
          />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
              <circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 L21 21" />
            </svg>
          </button>

          <ul v-if="open && suggestions.length" class="suggest">
            <li v-for="p in suggestions" :key="p.id">
              <RouterLink :to="`/products/${p.id}`">
                <span>{{ p.name }}</span>
                <span class="muted">in {{ p.category }}</span>
              </RouterLink>
            </li>
          </ul>
        </form>

        <RouterLink :to="user ? '/account' : '/login'" class="nav-item">
          <span class="nav-small">{{ user ? `Hello, ${firstName}` : 'Hello, sign in' }}</span>
          <span class="nav-strong">Account</span>
        </RouterLink>

        <RouterLink to="/wishlist" class="nav-item">
          <span class="nav-small">Your</span>
          <span class="nav-strong">
            Wishlist<span v-if="wishlistCount" class="pill">{{ wishlistCount }}</span>
          </span>
        </RouterLink>

        <RouterLink to="/cart" class="cart-link" aria-label="Cart">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h3l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6" />
            <circle cx="9.5" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" />
          </svg>
          <span class="cart-count">{{ cartCount }}</span>
          <span class="cart-text">Cart</span>
        </RouterLink>
      </div>
    </div>

    <nav class="sub" aria-label="Categories">
      <div class="wrap sub-inner">
        <RouterLink :to="{ path: '/products', query: { deals: '1' } }" class="deals-link">Today's deals</RouterLink>
        <RouterLink
          v-for="c in categories"
          :key="c"
          :to="{ path: '/products', query: { cat: c } }"
        >{{ c }}</RouterLink>
      </div>
    </nav>
  </header>
</template>
