<script setup>
import { toasts } from '../data/toast'
</script>

<template>
  <div class="toasts" aria-live="polite">
    <div v-for="t in toasts" :key="t.id" class="toast">
      <span>{{ t.text }}</span>
      <RouterLink v-if="t.action" :to="t.action.to">{{ t.action.label }}</RouterLink>
    </div>
  </div>
</template>
