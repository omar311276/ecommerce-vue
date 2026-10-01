<script setup>
import ProductImage from '../components/ProductImage.vue'
import {
  lines, cartCount, subtotal, shipping, total,
  FREE_SHIPPING_FROM, setQty, removeFromCart
} from '../data/cart'
import { isSaved, toggleWish } from '../data/wishlist'
import { notify } from '../data/toast'
import { money, deliveryDate } from '../data/products'

function saveForLater(id) {
  if (!isSaved(id)) toggleWish(id)
  removeFromCart(id)
  notify('Moved to your wishlist', { to: '/wishlist', label: 'View wishlist' })
}
</script>

<template>
  <div class="wrap">
    <div v-if="!cartCount" class="empty-box">
      <h1>Your cart is empty</h1>
      <p>Add something and it will show up here.</p>
      <RouterLink to="/products" class="btn-yellow">Continue shopping</RouterLink>
    </div>

    <div v-else class="cart-layout">
      <section class="cart-main">
        <h1>Shopping cart</h1>

        <ul>
          <li v-for="l in lines" :key="l.product.id" class="cart-line">
            <RouterLink :to="`/products/${l.product.id}`" class="cart-img">
              <ProductImage :src="l.product.images[0]" :alt="l.product.name" />
            </RouterLink>

            <div class="cart-info">
              <RouterLink :to="`/products/${l.product.id}`" class="cart-name">{{ l.product.name }}</RouterLink>
              <p class="stock">In stock</p>
              <p class="muted">Delivery by {{ deliveryDate(3) }}</p>

              <div class="cart-actions">
                <select
                  :value="l.qty"
                  :aria-label="`Quantity for ${l.product.name}`"
                  @change="setQty(l.product.id, Number($event.target.value))"
                >
                  <option v-for="n in 10" :key="n" :value="n">Qty: {{ n }}</option>
                </select>
                <button class="text-btn" @click="removeFromCart(l.product.id)">Delete</button>
                <button class="text-btn" @click="saveForLater(l.product.id)">Save for later</button>
              </div>
            </div>

            <strong class="line-price">{{ money(l.product.price * l.qty) }}</strong>
          </li>
        </ul>

        <p class="cart-sub">
          Subtotal ({{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}):
          <strong>{{ money(subtotal) }}</strong>
        </p>
      </section>

      <aside class="cart-side">
        <div v-if="shipping === 0" class="ship-ok">Your order qualifies for free delivery.</div>
        <div v-else class="ship-need">
          <p>Add <strong>{{ money(FREE_SHIPPING_FROM - subtotal) }}</strong> more for free delivery.</p>
          <div class="meter"><div :style="{ width: Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100) + '%' }" /></div>
        </div>

        <p class="side-sub">
          Subtotal ({{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}):
          <strong>{{ money(total) }}</strong>
        </p>
        <p class="muted small">{{ shipping ? `Includes ${money(shipping)} delivery` : 'Delivery included' }}</p>

        <RouterLink to="/checkout" class="btn-yellow block">Proceed to checkout</RouterLink>
      </aside>
    </div>
  </div>
</template>
