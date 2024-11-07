<script setup lang="ts">
import type { ItemFilterOptions } from '../src/types/model.types'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import AppFilterDialogComponent from '../src/components/AppFilterDialogComponent.vue'
import { getAllCategories } from './api/category.api'

const toast = useToast()

function showToast() {
  toast.add({
    severity: 'success',
    summary: 'Filters set',
    detail: 'Filter options updated successfully',
    life: 3000,
  })
}

const filterOptions = ref<ItemFilterOptions>({
  minPrice: 4,
  maxPrice: 5000,
  categoryId: undefined,
})

function onFilterOptionsChange(newOptions: ItemFilterOptions) {
  filterOptions.value = { ...newOptions }
  showToast()
}
</script>

<template>
  <Toast />
  <div>
    <AppFilterDialogComponent
      :filter-options="filterOptions"
      :fetch-categories="getAllCategories"
      @filter-options-change="onFilterOptionsChange"
    />
  </div>
</template>
