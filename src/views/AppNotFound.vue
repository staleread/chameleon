<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] gap-6">
    <div class="text-9xl font-bold text-primary">
      404
    </div>
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">
        Page Not Found
      </h1>
      <p class="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button
        label="Go to Catalog"
        icon="pi pi-shopping-bag"
        severity="primary"
        @click="router.push('/')"
      />
    </div>
  </div>
</template>
