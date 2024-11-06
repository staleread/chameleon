<script setup lang="ts">
import type { ItemFilterOptions } from '../src/types/model.types'
import AppFilterDialogComponent from '../src/components/AppFilterDialogComponent.vue'
import { getAllCategories } from './api/category.api'

const filterOptions: ItemFilterOptions = {
  minPrice: 1,
  maxPrice: 10000,
  categoryId: undefined,
}
</script>

<template>
  Hello, Chameleon!
  <div>
    <AppFilterDialogComponent :filter-options="filterOptions" :fetch-categories="getAllCategories" />
  </div>
</template>
