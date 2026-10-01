<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { products, categories } from '../data/products'

const route = useRoute()
const router = useRouter()

const sort = ref('featured')

const priceRanges = [
  { id: 'any', label: 'Any price', min: 0, max: Infinity },
  { id: 'u25', label: 'Under $25', min: 0, max: 25 },
  { id: '25-50', label: '$25 to $50', min: 25, max: 50 },
  { id: '50-100', label: '$50 to $100', min: 50, max: 100 },
  { id: '100+', label: '$100 and above', min: 100, max: Infinity }
]

// every filter lives in the url, so links and the back button just work
const activeCat = computed(() => route.query.cat || '')
const brand = computed(() => route.query.brand || '')
const priceId = computed(() => route.query.price || 'any')
const minRating = computed(() => Number(route.query.rating || 0))
const query = computed(() => (route.query.q || '').toString().trim())
const dealsOnly = computed(() => route.query.deals === '1')

function setFilter(patch) {
  const next = { ...route.query, ...patch }
  Object.keys(next).forEach((k) => {
    if (next[k] === '' || next[k] == null) delete next[k]
  })
  router.push({ path: '/products', query: next })
}

function matches(p, skip = '') {
  const range = priceRanges.find((r) => r.id === priceId.value) || priceRanges[0]
  const q = query.value.toLowerCase()
  if (skip !== 'cat' && activeCat.value && p.category !== activeCat.value) return false
  if (skip !== 'brand' && brand.value && p.brand !== brand.value) return false
  if (dealsOnly.value && !p.oldPrice) return false
  if (p.price < range.min || p.price >= range.max) return false
  if (p.rating < minRating.value) return false
  if (q && !`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)) return false
  return true
}

const shown = computed(() => {
  let list = products.filter((p) => matches(p))
  if (sort.value === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort.value === 'high') list = [...list].sort((a, b) => b.price - a.price)
  if (sort.value === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
  if (sort.value === 'reviews') list = [...list].sort((a, b) => b.reviews - a.reviews)
  return list
})

// brands that exist for the current category and search
const brands = computed(() =>
  [...new Set(products.filter((p) => matches(p, 'brand')).map((p) => p.brand))].sort()
)

const heading = computed(() => {
  if (query.value) return `Results for “${query.value}”`
  if (dealsOnly.value) return "Today's deals"
  return activeCat.value || 'All products'
})

// small removable tags above the results
const chips = computed(() => {
  const out = []
  if (activeCat.value) out.push({ label: activeCat.value, clear: { cat: '' } })
  if (brand.value) out.push({ label: brand.value, clear: { brand: '' } })
  if (priceId.value !== 'any') out.push({ label: priceRanges.find((r) => r.id === priceId.value)?.label, clear: { price: '' } })
  if (minRating.value) out.push({ label: `${minRating.value} stars & up`, clear: { rating: '' } })
  if (dealsOnly.value) out.push({ label: 'On sale', clear: { deals: '' } })
  if (query.value) out.push({ label: `“${query.value}”`, clear: { q: '' } })
  return out
})

function clearAll() {
  router.push('/products')
}
</script>

<template>
  <div class="wrap listing">
    <details class="filters" open>
      <summary>Filters</summary>

      <div class="filter-group">
        <h3>Category</h3>
        <button class="filter-link" :class="{ on: !activeCat }" @click="setFilter({ cat: '', brand: '' })">All categories</button>
        <button
          v-for="c in categories"
          :key="c"
          class="filter-link"
          :class="{ on: activeCat === c }"
          @click="setFilter({ cat: c, brand: '' })"
        >{{ c }}</button>
      </div>

      <div v-if="brands.length > 1 || brand" class="filter-group">
        <h3>Brand</h3>
        <label v-for="b in brands" :key="b" class="check">
          <input type="checkbox" :checked="brand === b" @change="setFilter({ brand: brand === b ? '' : b })" /> {{ b }}
        </label>
      </div>

      <div class="filter-group">
        <h3>Price</h3>
        <label v-for="r in priceRanges" :key="r.id" class="check">
          <input type="radio" name="price" :checked="priceId === r.id" @change="setFilter({ price: r.id === 'any' ? '' : r.id })" />
          {{ r.label }}
        </label>
      </div>

      <div class="filter-group">
        <h3>Customer rating</h3>
        <label v-for="[value, label] in [[0, 'Any rating'], [4, '4 stars & up'], [4.5, '4.5 stars & up']]" :key="value" class="check">
          <input type="radio" name="rating" :checked="minRating === value" @change="setFilter({ rating: value || '' })" />
          {{ label }}
        </label>
      </div>

      <div class="filter-group">
        <h3>Deals</h3>
        <label class="check">
          <input type="checkbox" :checked="dealsOnly" @change="setFilter({ deals: $event.target.checked ? '1' : '' })" />
          On sale
        </label>
      </div>
    </details>

    <section class="results">
      <div class="results-bar">
        <div>
          <h1>{{ heading }}</h1>
          <p class="muted">{{ shown.length }} {{ shown.length === 1 ? 'result' : 'results' }}</p>
        </div>
        <label class="sort">
          Sort by
          <select v-model="sort">
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Avg. customer review</option>
            <option value="reviews">Most reviews</option>
          </select>
        </label>
      </div>

      <div v-if="chips.length" class="chips">
        <button v-for="c in chips" :key="c.label" class="chip" @click="setFilter(c.clear)">
          {{ c.label }} <span aria-hidden="true">×</span><span class="sr-only">remove filter</span>
        </button>
        <button class="text-btn" @click="clearAll">Clear all</button>
      </div>

      <div v-if="shown.length" class="grid">
        <ProductCard v-for="p in shown" :key="p.id" :product="p" />
      </div>

      <div v-else class="empty-box">
        <h2>No results found</h2>
        <p>Try a different word, or remove some filters.</p>
        <button class="btn-yellow" @click="clearAll">Clear all filters</button>
      </div>
    </section>
  </div>
</template>
