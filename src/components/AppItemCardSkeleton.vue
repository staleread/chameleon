<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div
    class="p-4 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
  >
    <div class="bg-surface-50 flex justify-center rounded">
      <Skeleton class="rounded w-full max-w-72" height="150px" />
    </div>

    <div class="pt-4">
      <div class="mt-1">
        <Skeleton width="80px" height="30px" class="p-mb-1" />
        <Skeleton width="90%" height="24px" class="mt-3" />
      </div>
      <div class="flex flex-col gap-4 mt-8 mb-4">
        <Skeleton width="100px" height="30px" />
        <div class="flex gap-2">
          <Skeleton width="82%" height="42px" />
          <Skeleton width="18%" height="42px" />
        </div>
      </div>
    </div>
  </div>
</template>
