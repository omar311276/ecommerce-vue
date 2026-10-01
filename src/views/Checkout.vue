<script setup>
import { reactive, ref } from 'vue'
import ProductImage from '../components/ProductImage.vue'
import { lines, cartCount, subtotal, shipping, total, clearCart } from '../data/cart'
import { user, saveOrder, updateProfile } from '../data/auth'
import { money, deliveryDate } from '../data/products'

// signed-in people get their saved details filled in
const form = reactive({
  name: user.value?.name || '',
  phone: user.value?.phone || '',
  address: user.value?.address || '',
  city: user.value?.city || '',
  payment: 'cod'
})

// kept after clearing the cart so we can show a confirmation
const placed = ref(null)

function placeOrder() {
  const order = {
    number: 'K-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toISOString(),
    arrival: deliveryDate(3),
    items: lines.value.map((l) => ({ id: l.product.id, name: l.product.name, price: l.product.price, qty: l.qty })),
    count: cartCount.value,
    subtotal: subtotal.value,
    shipping: shipping.value,
    total: total.value,
    payment: form.payment,
    shipTo: { name: form.name, phone: form.phone, address: form.address, city: form.city }
  }

  if (user.value) {
    saveOrder(order)
    // remember the address for next time
    updateProfile({ phone: form.phone, address: form.address, city: form.city })
  }

  placed.value = order
  clearCart()
}
</script>

<template>
  <div class="wrap">
    <div v-if="placed" class="confirm">
      <h1>Order placed, thank you!</h1>
      <p>Order <strong>{{ placed.number }}</strong> for {{ placed.shipTo.name }} is on its way to {{ placed.shipTo.city }}.</p>
      <p>Arriving <strong>{{ placed.arrival }}</strong></p>
      <p class="muted">
        {{ placed.count }} {{ placed.count === 1 ? 'item' : 'items' }},
        {{ money(placed.total) }}, {{ placed.payment === 'cod' ? 'pay on delivery' : 'paid by card' }}
      </p>
      <p v-if="!user" class="muted">
        Want to track your orders?
        <RouterLink :to="{ path: '/login', query: { next: '/account' } }">Create an account</RouterLink>
      </p>
      <div class="confirm-actions">
        <RouterLink v-if="user" to="/account" class="btn-yellow">View your orders</RouterLink>
        <RouterLink to="/" class="btn-light">Continue shopping</RouterLink>
      </div>
    </div>

    <div v-else-if="!cartCount" class="empty-box">
      <h1>Nothing to check out</h1>
      <p>Your cart is empty.</p>
      <RouterLink to="/products" class="btn-yellow">Browse products</RouterLink>
    </div>

    <form v-else class="checkout" @submit.prevent="placeOrder">
      <div class="checkout-main">
        <h1>Checkout</h1>
        <p v-if="!user" class="muted">
          Checking out as a guest. <RouterLink :to="{ path: '/login', query: { next: '/checkout' } }">Sign in</RouterLink> to use your saved address.
        </p>

        <fieldset>
          <legend>1. Delivery address</legend>
          <label>Full name <input v-model="form.name" required autocomplete="name" /></label>
          <label>Phone number <input v-model="form.phone" type="tel" required autocomplete="tel" /></label>
          <label>Street address <input v-model="form.address" required autocomplete="street-address" /></label>
          <label>City <input v-model="form.city" required autocomplete="address-level2" /></label>
        </fieldset>

        <fieldset>
          <legend>2. Payment method</legend>
          <label class="radio"><input type="radio" value="cod" v-model="form.payment" /> Cash on delivery</label>
          <label class="radio"><input type="radio" value="card" v-model="form.payment" /> Credit or debit card</label>
          <p v-if="form.payment === 'card'" class="muted small">
            This is a demo store, so no card details are collected and nothing is charged.
          </p>
        </fieldset>

        <fieldset>
          <legend>3. Review items</legend>
          <ul class="review-list">
            <li v-for="l in lines" :key="l.product.id">
              <ProductImage :src="l.product.images[0]" :alt="l.product.name" />
              <div>
                <p class="cart-name">{{ l.product.name }}</p>
                <p class="muted">Qty {{ l.qty }} · arrives {{ deliveryDate(3) }}</p>
              </div>
              <strong>{{ money(l.product.price * l.qty) }}</strong>
            </li>
          </ul>
        </fieldset>
      </div>

      <aside class="cart-side">
        <button type="submit" class="btn-yellow block">Place your order</button>
        <h2>Order summary</h2>
        <dl class="sum">
          <div><dt>Items ({{ cartCount }})</dt><dd>{{ money(subtotal) }}</dd></div>
          <div><dt>Delivery</dt><dd>{{ shipping ? money(shipping) : 'Free' }}</dd></div>
          <div class="sum-total"><dt>Order total</dt><dd>{{ money(total) }}</dd></div>
        </dl>
      </aside>
    </form>
  </div>
</template>
