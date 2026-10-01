<script setup>
import { categories } from '../data/products'

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <button class="to-top" @click="toTop">Back to top</button>

    <div class="wrap footer-cols">
      <div>
        <h4>Shop by category</h4>
        <RouterLink
          v-for="c in categories"
          :key="c"
          :to="{ path: '/products', query: { cat: c } }"
        >{{ c }}</RouterLink>
      </div>
      <div>
        <h4>Your account</h4>
        <RouterLink to="/account">Orders and profile</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
        <RouterLink :to="{ path: '/products', query: { deals: '1' } }">Today's deals</RouterLink>
      </div>
      <div>
        <h4>Delivery</h4>
        <p>Free delivery on orders over $50. Pay when your order arrives, or by card at checkout. Returns accepted within 30 days.</p>
      </div>
    </div>

    <div class="footer-base">
      <RouterLink to="/" class="brand">Kolo</RouterLink>
      <p>A demo store built with Vue. Products, prices and accounts are sample data kept in your browser.</p>
    </div>
  </footer>
</template>
