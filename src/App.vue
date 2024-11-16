<script setup lang="ts">
import AppNavBar from './components/AppNavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavBar />
    <main class="container mx-auto px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>
