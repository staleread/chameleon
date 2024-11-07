<script setup lang="ts">
import type { ItemCategory, ItemFilterOptions } from '../types/model.types'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import Slider from 'primevue/slider'
import { computed, ref, watch } from 'vue'

const { filterOptions, fetchCategories } = defineProps<{
  filterOptions: ItemFilterOptions
  fetchCategories: () => Promise<ItemCategory[]>
}>()

const emit = defineEmits<{
  (e: 'filterOptionsChange', newOptions: ItemFilterOptions): void
}>()

const MIN_PRICE_VALUE = 1
const MAX_PRICE_VALUE = 10000
const PRICE_SLIDER_STEP = 10

const isDialogVisible = ref(false)

const hasChanges = ref(false)
const minPrice = ref<number>(filterOptions.minPrice)
const maxPrice = ref<number>(filterOptions.maxPrice)
const categoryId = ref<number | undefined>(filterOptions.categoryId)

watch([minPrice, maxPrice, categoryId], () => {
  hasChanges.value = true
})

watch(isDialogVisible, (value: boolean) => {
  if (value) {
    hasChanges.value = false
  }
})

function resetFilters() {
  minPrice.value = MIN_PRICE_VALUE
  maxPrice.value = MAX_PRICE_VALUE
  categoryId.value = undefined
}

function cancelFilters() {
  isDialogVisible.value = false

  minPrice.value = filterOptions.minPrice
  maxPrice.value = filterOptions.maxPrice
  categoryId.value = filterOptions.categoryId
}

function applyFilters() {
  isDialogVisible.value = false

  const newFilterOptions: ItemFilterOptions = {
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    categoryId: categoryId.value,
  }
  emit('filterOptionsChange', newFilterOptions)
}

const priceRange = computed(() => [minPrice.value, maxPrice.value])

function onPriceRangeChange(newRange: number | number[]) {
  [minPrice.value, maxPrice.value] = newRange as [number, number]
}

const categories = ref<ItemCategory[]>([])
const isFetchingCategories = ref(false)

async function loadCategories() {
  isFetchingCategories.value = true
  try {
    categories.value = await fetchCategories()
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isFetchingCategories.value = false
  }
}

watch(isDialogVisible, async (newVal) => {
  if (newVal && categories.value.length === 0) {
    await loadCategories()
  }
})
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
          <span class="mb-2">{{ minPrice }} - {{ maxPrice }}</span>
          <Slider
            :model-value="priceRange"
            :min="MIN_PRICE_VALUE"
            :max="MAX_PRICE_VALUE"
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
          v-model="categoryId"
          show-clear
          option-label="name"
          class="w-full md:w-56"
          :options="categories"
          :placeholder="isFetchingCategories ? 'Loading...' : 'Select Category'"
          :disabled="isFetchingCategories"
          :loading="isFetchingCategories"
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
