<template>
  <div class="flex items-center p-4 border-b">
    <!-- Скелетон для зображення товару -->
    <Skeleton shape="rectangle" height="60px" width="60px" class="w-20 h-20 mr-4"></Skeleton>

    <!-- Скелетон для інформації про товар -->
    <div class="flex-1 space-y-2">
      <Skeleton shape="text" width="75%"></Skeleton>
      <Skeleton shape="text" width="50%"></Skeleton>
    </div>

    <!-- Скелетон для введення кількості -->
    <div class="w-32">
      <Skeleton shape="rectangle" height="40px"></Skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<style scoped>
</style>
