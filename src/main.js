import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './assets/style.css'
import { user } from './data/auth'

import Home from './views/Home.vue'
import Products from './views/Products.vue'
import ProductDetails from './views/ProductDetails.vue'
import Cart from './views/Cart.vue'
import Checkout from './views/Checkout.vue'
import Login from './views/Login.vue'
import Account from './views/Account.vue'
import Wishlist from './views/Wishlist.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/products/:id', component: ProductDetails },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: Checkout },
    { path: '/login', component: Login },
    { path: '/account', component: Account, meta: { needsLogin: true } },
    { path: '/wishlist', component: Wishlist }
  ],
  scrollBehavior: () => ({ top: 0 })
})

// pages that need an account send you to the sign-in page first
router.beforeEach((to) => {
  if (to.meta.needsLogin && !user.value) {
    return { path: '/login', query: { next: to.fullPath } }
  }
})

createApp(App).use(router).mount('#app')
