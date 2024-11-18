<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="flex items-center p-4 border-b">
    <Skeleton shape="rectangle" height="60px" width="60px" class="w-20 h-20 mr-4" />

    <div class="flex-1 space-y-2">
      <Skeleton shape="rectangle" width="75%" />
      <Skeleton shape="rectangle" width="50%" />
    </div>

    <div class="w-32">
      <Skeleton shape="rectangle" height="40px" />
    </div>
  </div>
</template>

<style scoped>
</style>
