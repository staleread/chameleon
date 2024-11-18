<script setup lang="ts">
import type { ItemCategory, ItemFilterOptions } from '../types/model.types'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import Slider from 'primevue/slider'
import { computed, ref, watch } from 'vue'
import useLoading from '../composables/useLoading'

const { filterOptions, fetchCategories, minPrice, maxPrice } = defineProps<{
  filterOptions: ItemFilterOptions
  fetchCategories: () => Promise<ItemCategory[]>
  minPrice: number
  maxPrice: number
}>()

const emit = defineEmits<{
  (e: 'filterOptionsChange', newOptions: ItemFilterOptions): void
  (e: 'fetchCategoriesFail'): void
}>()

const PRICE_SLIDER_STEP = 10

const isDialogVisible = ref(false)

const canLoadCategories = ref(false)
const categories = ref<ItemCategory[]>([])

watch(isDialogVisible, (value) => {
  if (value) {
    canLoadCategories.value = true
  }
})

const isLoading = useLoading({
  watcher: async () => {
    if (canLoadCategories.value) {
      categories.value = await fetchCategories()
    }
  },
  onError: () => {
    emit('fetchCategoriesFail')
    isDialogVisible.value = false
    canLoadCategories.value = false
  },
})

const hasChanges = ref(false)
const lowPrice = ref<number>(filterOptions.minPrice)
const highPrice = ref<number>(filterOptions.maxPrice)
const category = ref<ItemCategory | undefined>(undefined)

watch([lowPrice, highPrice, category], () => {
  hasChanges.value = true
})

watch(isDialogVisible, (value: boolean) => {
  if (value) {
    hasChanges.value = false
  }
})

function resetFilters() {
  lowPrice.value = minPrice
  highPrice.value = maxPrice
  category.value = undefined
}

function cancelFilters() {
  isDialogVisible.value = false

  lowPrice.value = filterOptions.minPrice
  highPrice.value = filterOptions.maxPrice
  category.value = categories.value.find(c => c.id === filterOptions.categoryId)
}

function applyFilters() {
  isDialogVisible.value = false

  const newFilterOptions: ItemFilterOptions = {
    minPrice: lowPrice.value,
    maxPrice: highPrice.value,
    categoryId: category.value?.id,
  }
  emit('filterOptionsChange', newFilterOptions)
}

const priceRange = computed(() => [lowPrice.value, highPrice.value])

function onPriceRangeChange(newRange: number | number[]) {
  [lowPrice.value, highPrice.value] = newRange as [number, number]
}
</script>

<template>
  <div class="flex justify-center">
    <Button label="Filters" @click="isDialogVisible = true" />

    <Dialog
      v-model:visible="isDialogVisible" modal header="Adjust filter options" :style="{ width: '25rem' }"
      :closable="false"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="price" class="font-semibold w-24">Price range</label>
        <div class="flex flex-col items-center w-56">
          <span class="mb-2">{{ lowPrice }} - {{ highPrice }}</span>
          <Slider
            :model-value="priceRange"
            :min="minPrice"
            :max="maxPrice"
            :step="PRICE_SLIDER_STEP"
            range
            class="w-full"
            @update:model-value="onPriceRangeChange"
          />
        </div>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="category" class="font-semibold w-24">Category</label>
        <Select
          v-model="category"
          show-clear
          option-label="name"
          class="w-full md:w-56"
          :options="categories"
          :placeholder="isLoading ? 'Loading...' : 'Select Category'"
          :disabled="isLoading"
          :loading="isLoading"
        />
      </div>

      <div class="flex justify-between w-full">
        <Button type="button" label="Reset" severity="secondary" @click="resetFilters" />

        <div class="flex gap-2">
          <Button type="button" label="Cancel" severity="danger" @click="cancelFilters" />
          <Button type="button" label="Apply" :disabled="!hasChanges" @click="applyFilters" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
