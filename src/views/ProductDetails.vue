<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductImage from '../components/ProductImage.vue'
import ProductRow from '../components/ProductRow.vue'
import StarRating from '../components/StarRating.vue'
import WishlistButton from '../components/WishlistButton.vue'
import { getProduct, products, discount, money, deliveryDate } from '../data/products'
import { addToCart } from '../data/cart'
import { notify } from '../data/toast'
import { recent, markViewed } from '../data/recent'

const route = useRoute()
const router = useRouter()

const product = computed(() => getProduct(route.params.id))
const related = computed(() =>
  products.filter((p) => p.category === product.value?.category && p.id !== product.value?.id)
)
// recently viewed, without the product on screen
const seen = computed(() =>
  recent.ids.filter((id) => id !== product.value?.id).map(getProduct).filter(Boolean)
)

const picked = ref(0)
const qty = ref(1)

watch(
  () => route.params.id,
  () => {
    picked.value = 0
    qty.value = 1
    if (product.value) markViewed(product.value.id)
  },
  { immediate: true }
)

const stockText = computed(() => {
  const s = product.value.stock
  return s <= 10 ? `Only ${s} left in stock - order soon.` : 'In stock'
})

// rough spread of star ratings that matches the average
const breakdown = computed(() => {
  const r = product.value.rating
  const w = [5, 4, 3, 2, 1].map((s) => Math.exp(-Math.pow(s - r, 2) * 1.4))
  const sum = w.reduce((a, b) => a + b, 0)
  return w.map((x, i) => ({ stars: 5 - i, pct: Math.round((x / sum) * 100) }))
})

function add() {
  addToCart(product.value.id, qty.value)
  notify(`Added ${qty.value} to your cart`, { to: '/cart', label: 'View cart' })
}
function buyNow() {
  addToCart(product.value.id, qty.value)
  router.push('/checkout')
}
</script>

<template>
  <div v-if="product" class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <RouterLink to="/products">All products</RouterLink>
      <span>›</span>
      <RouterLink :to="{ path: '/products', query: { cat: product.category } }">{{ product.category }}</RouterLink>
    </nav>

    <div class="detail">
      <div class="gallery">
        <div class="thumbs">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            :class="{ on: picked === i }"
            :aria-label="`Photo ${i + 1}`"
            @mouseenter="picked = i"
            @click="picked = i"
          >
            <ProductImage :src="img" :alt="product.name" />
          </button>
        </div>
        <div class="main-img">
          <ProductImage :src="product.images[picked]" :alt="product.name" />
        </div>
      </div>

      <div class="info">
        <h1>{{ product.name }}</h1>
        <p class="brand-line">by {{ product.brand }}</p>
        <StarRating :rating="product.rating" :count="product.reviews" />
        <span class="rating-num">{{ product.rating }} out of 5</span>

        <hr />

        <p class="detail-price">
          <span v-if="discount(product)" class="off">-{{ discount(product) }}%</span>
          <span class="big">{{ money(product.price) }}</span>
        </p>
        <p v-if="product.oldPrice" class="muted">List price: <s>{{ money(product.oldPrice) }}</s></p>

        <h2 class="about-title">About this item</h2>
        <ul class="bullets">
          <li v-for="b in product.bullets" :key="b">{{ b }}</li>
        </ul>
        <p class="about">{{ product.about }}</p>
      </div>

      <aside class="buybox">
        <p class="detail-price"><span class="big">{{ money(product.price) }}</span></p>
        <p class="free-line">Free delivery on orders over $50</p>
        <p>Get it by <strong>{{ deliveryDate(3) }}</strong></p>
        <p class="stock" :class="{ low: product.stock <= 10 }">{{ stockText }}</p>

        <label class="qty-select">
          Quantity:
          <select v-model.number="qty">
            <option v-for="n in Math.min(product.stock, 10)" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>

        <button class="btn-yellow block" @click="add">Add to cart</button>
        <button class="btn-orange block" @click="buyNow">Buy now</button>
        <WishlistButton :id="product.id" label />

        <dl class="sold-by">
          <div><dt>Sold by</dt><dd>{{ product.brand }}</dd></div>
          <div><dt>Payment</dt><dd>Cash on delivery or card</dd></div>
          <div><dt>Returns</dt><dd>30 days</dd></div>
        </dl>
      </aside>
    </div>

    <div class="below">
      <section>
        <h2>Product details</h2>
        <table class="spec-table">
          <tbody>
            <tr><th scope="row">Brand</th><td>{{ product.brand }}</td></tr>
            <tr><th scope="row">Category</th><td>{{ product.category }}</td></tr>
            <tr><th scope="row">Item number</th><td>K-{{ String(product.id).padStart(5, '0') }}</td></tr>
            <tr><th scope="row">Customer reviews</th><td>{{ product.rating }} out of 5 ({{ product.reviews.toLocaleString() }} ratings)</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Customer ratings</h2>
        <div v-for="b in breakdown" :key="b.stars" class="bar-row">
          <span>{{ b.stars }} star</span>
          <div class="bar"><div :style="{ width: b.pct + '%' }" /></div>
          <span>{{ b.pct }}%</span>
        </div>
      </section>
    </div>

    <ProductRow v-if="related.length" :title="`More in ${product.category}`" :products="related" />
    <ProductRow v-if="seen.length" title="Recently viewed" :products="seen" />
  </div>

  <div v-else class="wrap">
    <div class="empty-box">
      <h2>We could not find that product</h2>
      <RouterLink to="/products" class="btn-yellow">Back to all products</RouterLink>
    </div>
  </div>
</template>
