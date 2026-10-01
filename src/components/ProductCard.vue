<script setup>
import ProductImage from './ProductImage.vue'
import StarRating from './StarRating.vue'
import WishlistButton from './WishlistButton.vue'
import { addToCart } from '../data/cart'
import { notify } from '../data/toast'
import { discount, money, deliveryDate } from '../data/products'

const props = defineProps({
  product: { type: Object, required: true }
})

function add() {
  addToCart(props.product.id)
  notify('Added to your cart', { to: '/cart', label: 'View cart' })
}
</script>

<template>
  <article class="card">
    <div class="card-img">
      <RouterLink :to="`/products/${product.id}`" :aria-label="product.name">
        <ProductImage :src="product.images[0]" :alt="product.name" />
      </RouterLink>
      <span v-if="discount(product)" class="deal-tag">-{{ discount(product) }}%</span>
      <WishlistButton :id="product.id" />
    </div>

    <div class="card-body">
      <p class="card-brand">{{ product.brand }}</p>
      <RouterLink :to="`/products/${product.id}`" class="card-title">{{ product.name }}</RouterLink>
      <StarRating :rating="product.rating" :count="product.reviews" />

      <p class="price-line">
        <span class="price">{{ money(product.price) }}</span>
        <s v-if="product.oldPrice" class="old-price">{{ money(product.oldPrice) }}</s>
      </p>

      <p class="delivery">Get it by <strong>{{ deliveryDate(3) }}</strong></p>

      <button class="btn-cart" @click="add">Add to cart</button>
    </div>
  </article>
</template>
