<script setup lang="ts">
import type { ItemCategory, ItemFilterOptions } from '../src/types/model.types'
import AppFilterDialogComponent from '../src/components/AppFilterDialogComponent.vue'

const filterOptions: ItemFilterOptions = {
  minPrice: 1,
  maxPrice: 10000,
  categoryId: undefined,
}

const categories: ItemCategory[] = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Books' },
  { id: 3, name: 'Clothing' },
  { id: 4, name: 'Garden' },

]
</script>

<template>
  Hello, Chameleon!
  <div>
    <AppFilterDialogComponent :filter-options="filterOptions" :categories="categories" />
  </div>
</template>
