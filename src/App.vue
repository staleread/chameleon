<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue'
import AppNavBar from './components/layout/AppNavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppNavBar />
    <main class="container mx-auto px-4 py-6 flex-grow">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
