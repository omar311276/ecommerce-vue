<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductImage from '../components/ProductImage.vue'
import { user, orders, logout, updateProfile } from '../data/auth'
import { wishlistCount } from '../data/wishlist'
import { addToCart } from '../data/cart'
import { notify } from '../data/toast'
import { getProduct, money } from '../data/products'

const route = useRoute()
const router = useRouter()

const tab = computed(() => (route.query.tab === 'profile' ? 'profile' : 'orders'))

const form = reactive({
  name: user.value.name,
  phone: user.value.phone,
  address: user.value.address,
  city: user.value.city
})

function saveProfile() {
  updateProfile({ ...form })
  notify('Profile saved')
}

function signOut() {
  logout()
  notify('You have signed out')
  router.push('/')
}

function buyAgain(item) {
  addToCart(item.id)
  notify(`Added ${item.name} to your cart`, { to: '/cart', label: 'View cart' })
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// demo status: it moves along as the days pass
function status(order) {
  const days = (Date.now() - new Date(order.date).getTime()) / 86400000
  if (days < 1) return 'Order placed'
  if (days < 3) return 'On the way'
  return 'Delivered'
}
</script>

<template>
  <div v-if="user" class="wrap account">
    <aside class="acc-side">
      <div class="acc-id">
        <span class="avatar" aria-hidden="true">{{ user.name.charAt(0).toUpperCase() }}</span>
        <div>
          <strong>{{ user.name }}</strong>
          <p class="muted small">{{ user.email }}</p>
        </div>
      </div>

      <nav aria-label="Account">
        <RouterLink :to="{ path: '/account', query: { tab: 'orders' } }" :class="{ on: tab === 'orders' }">Your orders</RouterLink>
        <RouterLink :to="{ path: '/account', query: { tab: 'profile' } }" :class="{ on: tab === 'profile' }">Profile and address</RouterLink>
        <RouterLink to="/wishlist">Wishlist <span v-if="wishlistCount" class="pill dark">{{ wishlistCount }}</span></RouterLink>
        <button class="signout" @click="signOut">Sign out</button>
      </nav>
    </aside>

    <section class="acc-main">
      <template v-if="tab === 'orders'">
        <h1>Your orders</h1>

        <div v-if="!orders.length" class="empty-box flat">
          <p>You have not placed an order yet.</p>
          <RouterLink to="/products" class="btn-yellow">Start shopping</RouterLink>
        </div>

        <article v-for="o in orders" :key="o.number" class="order">
          <header class="order-head">
            <div><span>Order placed</span><strong>{{ fmtDate(o.date) }}</strong></div>
            <div><span>Total</span><strong>{{ money(o.total) }}</strong></div>
            <div><span>Ship to</span><strong>{{ o.shipTo.name }}</strong></div>
            <div class="order-no"><span>Order</span><strong>{{ o.number }}</strong></div>
          </header>

          <div class="order-body">
            <h2>{{ status(o) }}<span v-if="status(o) !== 'Delivered'" class="muted"> · arriving {{ o.arrival }}</span></h2>

            <div v-for="item in o.items" :key="item.id" class="order-item">
              <RouterLink :to="`/products/${item.id}`" class="order-img">
                <ProductImage :src="getProduct(item.id)?.images[0] || ''" :alt="item.name" />
              </RouterLink>
              <div>
                <RouterLink :to="`/products/${item.id}`" class="cart-name">{{ item.name }}</RouterLink>
                <p class="muted">Qty {{ item.qty }} · {{ money(item.price) }} each</p>
                <button class="btn-cart" @click="buyAgain(item)">Buy it again</button>
              </div>
            </div>
          </div>
        </article>
      </template>

      <template v-else>
        <h1>Profile and address</h1>
        <form class="profile" @submit.prevent="saveProfile">
          <label>Full name <input v-model="form.name" required autocomplete="name" /></label>
          <label>Email <input :value="user.email" disabled /></label>
          <label>Phone number <input v-model="form.phone" type="tel" autocomplete="tel" /></label>
          <label>Street address <input v-model="form.address" autocomplete="street-address" /></label>
          <label>City <input v-model="form.city" autocomplete="address-level2" /></label>
          <button class="btn-yellow">Save changes</button>
        </form>
      </template>
    </section>
  </div>
</template>
