<script setup lang="ts">
import type { ItemFilterOptions } from '../src/types/model.types'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import AppFilterDialogComponent from '../src/components/AppFilterDialogComponent.vue'
import AppItemSearchInput from '../src/components/AppItemSearchInput.vue'
import { getAllCategories } from './api/category.api'

const toast = useToast()

const filterOptions = ref<ItemFilterOptions>({
  minPrice: 4,
  maxPrice: 5000,
  categoryId: undefined,
})

function onFilterOptionsChange(newOptions: ItemFilterOptions) {
  filterOptions.value = { ...newOptions }
  toast.add({
    severity: 'success',
    summary: 'Filters set',
    detail: 'Filter options updated successfully',
    life: 3000,
  })
}

function onFetchCategoriesFailed() {
  toast.add({
    severity: 'error',
    summary: 'Oops...',
    detail: 'Failed to fetch the caterories',
    life: 3000,
  })
}
</script>

<template>
  <Toast />
  <div>
    <AppFilterDialogComponent
      :filter-options="filterOptions"
      :fetch-categories="getAllCategories"
      @filter-options-change="onFilterOptionsChange"
      @fetch-categories-fail="onFetchCategoriesFailed"
    />
    <AppItemSearchInput />
  </div>
</template>
