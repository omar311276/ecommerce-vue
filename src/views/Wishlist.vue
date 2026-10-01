<script setup>
import { computed } from 'vue'
import ProductImage from '../components/ProductImage.vue'
import StarRating from '../components/StarRating.vue'
import { wishlistIds, removeWish } from '../data/wishlist'
import { user } from '../data/auth'
import { addToCart } from '../data/cart'
import { notify } from '../data/toast'
import { getProduct, money, discount } from '../data/products'

const items = computed(() => wishlistIds.value.map(getProduct).filter(Boolean))

function moveToCart(p) {
  addToCart(p.id)
  removeWish(p.id)
  notify('Moved to your cart', { to: '/cart', label: 'View cart' })
}
</script>

<template>
  <div class="wrap">
    <div class="wish-head">
      <h1>Your wishlist</h1>
      <p v-if="!user" class="muted">
        You are not signed in. <RouterLink :to="{ path: '/login', query: { next: '/wishlist' } }">Sign in</RouterLink>
        to keep this list on your account.
      </p>
    </div>

    <div v-if="!items.length" class="empty-box">
      <h2>Nothing saved yet</h2>
      <p>Tap the heart on any product to keep it here.</p>
      <RouterLink to="/products" class="btn-yellow">Browse products</RouterLink>
    </div>

    <ul v-else class="wish-list">
      <li v-for="p in items" :key="p.id" class="wish-item">
        <RouterLink :to="`/products/${p.id}`" class="wish-img">
          <ProductImage :src="p.images[0]" :alt="p.name" />
        </RouterLink>

        <div class="wish-info">
          <RouterLink :to="`/products/${p.id}`" class="cart-name">{{ p.name }}</RouterLink>
          <p class="muted">by {{ p.brand }}</p>
          <StarRating :rating="p.rating" :count="p.reviews" />
          <p class="price-line">
            <span class="price">{{ money(p.price) }}</span>
            <s v-if="p.oldPrice" class="old-price">{{ money(p.oldPrice) }}</s>
            <span v-if="discount(p)" class="off-pill">-{{ discount(p) }}%</span>
          </p>
          <p :class="p.stock <= 10 ? 'stock low' : 'stock'">{{ p.stock <= 10 ? `Only ${p.stock} left` : 'In stock' }}</p>
        </div>

        <div class="wish-actions">
          <button class="btn-yellow" @click="moveToCart(p)">Move to cart</button>
          <button class="btn-light" @click="removeWish(p.id)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>
