<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ProductImage from '../components/ProductImage.vue'
import ProductRow from '../components/ProductRow.vue'
import { products, getProduct, discount, money } from '../data/products'
import { recent } from '../data/recent'

/* ---------- hero slider ---------- */
const slides = [
  { title: 'Up to 30% off electronics', text: 'Headphones, smart watches and monitors, marked down this week.', cta: 'Shop electronics',
    to: { path: '/products', query: { cat: 'Electronics' } }, bg: 'linear-gradient(110deg, #172B3A 45%, #2D4A63)', product: getProduct(1) },
  { title: 'Fill the kitchen for less', text: 'Air fryers, skillets and dinner sets, with free delivery over $50.', cta: 'Shop home & kitchen',
    to: { path: '/products', query: { cat: 'Home & Kitchen' } }, bg: 'linear-gradient(110deg, #1D4A43 45%, #2F6B60)', product: getProduct(5) },
  { title: 'Get moving this month', text: 'Yoga mats, dumbbells and bottles that keep up with you.', cta: 'Shop sports',
    to: { path: '/products', query: { cat: 'Sports' } }, bg: 'linear-gradient(110deg, #3A3355 45%, #55497A)', product: getProduct(12) },
  { title: 'New season, new look', text: 'Jackets, sneakers and sunglasses, all under $65.', cta: 'Shop fashion',
    to: { path: '/products', query: { cat: 'Fashion' } }, bg: 'linear-gradient(110deg, #5A3A2E 45%, #7B523F)', product: getProduct(10) }
]

const current = ref(0)
let timer = null

function go(i) {
  current.value = (i + slides.length) % slides.length
}
function start() {
  stop()
  timer = setInterval(() => go(current.value + 1), 6000)
}
function stop() {
  clearInterval(timer)
}
onMounted(start)
onBeforeUnmount(stop)

/* ---------- category cards ---------- */
function pics(cat) {
  const list = products.filter((p) => p.category === cat)
  // first photo of each product, then second photos if more are needed
  return [...list.map((p) => p.images[0]), ...list.map((p) => p.images[1])].slice(0, 4)
}

const cardsTop = ['Electronics', 'Home & Kitchen', 'Fashion', 'Sports']
const cardsBottom = ['Books', 'Beauty', 'Toys']

const priceTiles = [
  { label: 'Under $25', price: 'u25' },
  { label: '$25 to $50', price: '25-50' },
  { label: '$50 to $100', price: '50-100' },
  { label: '$100 and above', price: '100+' }
]

const perks = [
  ['Free delivery', 'on orders over $50'],
  ['30-day returns', 'if it is not right for you'],
  ['Pay on delivery', 'or by card at checkout'],
  ['Real support', 'answers within a day']
]

/* ---------- product rows ---------- */
const deals = computed(() => products.filter((p) => p.oldPrice).sort((a, b) => discount(b) - discount(a)))
const topRated = computed(() => [...products].filter((p) => p.rating >= 4.6).sort((a, b) => b.reviews - a.reviews))
const electronics = computed(() => products.filter((p) => p.category === 'Electronics'))
const seen = computed(() => recent.ids.map(getProduct).filter(Boolean))
</script>

<template>
  <section class="hero" @mouseenter="stop" @mouseleave="start">
    <div class="hero-track" :style="{ transform: `translateX(-${current * 100}%)` }">
      <div v-for="(s, i) in slides" :key="i" class="slide" :style="{ background: s.bg }" :aria-hidden="i !== current">
        <div class="wrap slide-inner">
          <div class="slide-copy">
            <h1>{{ s.title }}</h1>
            <p>{{ s.text }}</p>
            <RouterLink :to="s.to" class="btn-yellow" :tabindex="i === current ? 0 : -1">{{ s.cta }}</RouterLink>
          </div>
          <RouterLink :to="`/products/${s.product.id}`" class="slide-img" :tabindex="i === current ? 0 : -1">
            <ProductImage :src="s.product.images[0]" :alt="s.product.name" />
            <span class="slide-tag">{{ s.product.name }} · {{ money(s.product.price) }}</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <button class="hero-arrow left" aria-label="Previous slide" @click="go(current - 1)">‹</button>
    <button class="hero-arrow right" aria-label="Next slide" @click="go(current + 1)">›</button>
    <div class="dots">
      <button v-for="(s, i) in slides" :key="i" :class="{ on: i === current }" :aria-label="`Slide ${i + 1}`" @click="go(i)" />
    </div>
  </section>

  <div class="wrap overlap">
    <div class="cat-grid">
      <article v-for="c in cardsTop" :key="c" class="cat-card">
        <h2>{{ c }}</h2>
        <RouterLink :to="{ path: '/products', query: { cat: c } }" class="cat-pics">
          <ProductImage v-for="(src, i) in pics(c)" :key="i" :src="src" :alt="c" />
        </RouterLink>
        <RouterLink :to="{ path: '/products', query: { cat: c } }" class="text-link">Shop {{ c.toLowerCase() }}</RouterLink>
      </article>
    </div>

    <ProductRow v-if="seen.length" title="Pick up where you left off" :products="seen" />

    <ProductRow title="Today's deals" :products="deals" :to="{ path: '/products', query: { deals: '1' } }" to-label="See all deals" />

    <section class="price-strip">
      <h2>Shop by budget</h2>
      <div class="price-tiles">
        <RouterLink v-for="t in priceTiles" :key="t.price" :to="{ path: '/products', query: { price: t.price } }">{{ t.label }}</RouterLink>
      </div>
    </section>

    <div class="cat-grid">
      <article v-for="c in cardsBottom" :key="c" class="cat-card">
        <h2>{{ c }}</h2>
        <RouterLink :to="{ path: '/products', query: { cat: c } }" class="cat-pics">
          <ProductImage v-for="(src, i) in pics(c)" :key="i" :src="src" :alt="c" />
        </RouterLink>
        <RouterLink :to="{ path: '/products', query: { cat: c } }" class="text-link">Shop {{ c.toLowerCase() }}</RouterLink>
      </article>

      <article class="cat-card promo">
        <h2>Save the things you like</h2>
        <p>Make an account to keep a wishlist and see your orders in one place.</p>
        <RouterLink to="/login" class="btn-yellow">Create an account</RouterLink>
      </article>
    </div>

    <ProductRow title="Top rated by customers" :products="topRated" to="/products" />
    <ProductRow title="Best in electronics" :products="electronics" :to="{ path: '/products', query: { cat: 'Electronics' } }" />

    <ul class="perks">
      <li v-for="[a, b] in perks" :key="a"><strong>{{ a }}</strong><span>{{ b }}</span></li>
    </ul>
  </div>
</template>
