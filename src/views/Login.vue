<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login, register, user } from '../data/auth'
import { notify } from '../data/toast'

const route = useRoute()
const router = useRouter()

const creating = ref(route.query.mode === 'new')
const form = reactive({ name: '', email: '', password: '' })
const error = ref('')
const busy = ref(false)

// already signed in? go straight to the account
if (user.value) router.replace('/account')

async function submit() {
  error.value = ''
  busy.value = true
  try {
    if (creating.value) await register(form)
    else await login(form)
    notify(creating.value ? 'Your account is ready' : 'Signed in')
    router.push(route.query.next || '/account')
  } catch (e) {
    error.value = e.message
  } finally {
    busy.value = false
  }
}

function switchMode() {
  creating.value = !creating.value
  error.value = ''
}
</script>

<template>
  <div class="auth">
    <RouterLink to="/" class="brand brand-dark">Kolo</RouterLink>

    <form class="auth-box" @submit.prevent="submit">
      <h1>{{ creating ? 'Create account' : 'Sign in' }}</h1>

      <p v-if="error" class="form-error" role="alert">{{ error }}</p>

      <label v-if="creating">
        Your name
        <input v-model="form.name" required autocomplete="name" />
      </label>
      <label>
        Email
        <input v-model="form.email" type="email" required autocomplete="email" />
      </label>
      <label>
        Password
        <input
          v-model="form.password"
          type="password"
          required
          minlength="6"
          :autocomplete="creating ? 'new-password' : 'current-password'"
        />
        <span v-if="creating" class="muted small">At least 6 characters.</span>
      </label>

      <button class="btn-yellow block" :disabled="busy">
        {{ creating ? 'Create your account' : 'Sign in' }}
      </button>

      <p class="muted small">
        Demo accounts are saved only in this browser. Please do not use a password you use anywhere else.
      </p>
    </form>

    <div class="auth-switch">
      <p class="muted">{{ creating ? 'Already have an account?' : 'New to Kolo?' }}</p>
      <button class="btn-light block" @click="switchMode">
        {{ creating ? 'Sign in instead' : 'Create your account' }}
      </button>
    </div>
  </div>
</template>
