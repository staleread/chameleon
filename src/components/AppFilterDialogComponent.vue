<script setup lang="ts">
import type { ItemCategory, ItemFilterOptions } from '../types/model.types'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import Slider from 'primevue/slider'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  filterOptions: ItemFilterOptions
  categories: ItemCategory[]
}>()

const emit = defineEmits<{
  (e: 'filterOptionsChange', newOptions: ItemFilterOptions): void
}>()

const initialFilterOptions = ref({ ...props.filterOptions })
const editableFilterOptions = ref({ ...props.filterOptions })
const toast = useToast()
const visible = ref(false)
const priceValue = ref([props.filterOptions.minPrice, props.filterOptions.maxPrice])
const selectedCategory = ref(props.filterOptions.categoryId)

watch(() => props.filterOptions, (newOptions) => { // зміна при передавані пропсів
  initialFilterOptions.value = { ...newOptions }
  editableFilterOptions.value = { ...newOptions }
})

watch(priceValue, (newValue) => { // зміна ціни
  editableFilterOptions.value.minPrice = newValue[0]
  editableFilterOptions.value.maxPrice = newValue[1]
})

watch(selectedCategory, (newCategoryId) => { // зміна категорії
  editableFilterOptions.value.categoryId = newCategoryId
})

function resetFilters() {
  priceValue.value = [1, 10000]
  selectedCategory.value = undefined
}

function cancelFilters() {
  visible.value = false
  editableFilterOptions.value = { ...initialFilterOptions.value }
  priceValue.value = [editableFilterOptions.value.minPrice, editableFilterOptions.value.maxPrice]
  selectedCategory.value = editableFilterOptions.value.categoryId
}

function showToast() {
  toast.add({ severity: 'success', summary: 'Filters set', detail: 'Filter options updated successfully', life: 3000 })
}

const isApplyDisabled = computed(() => {
  return JSON.stringify(editableFilterOptions.value) === JSON.stringify(initialFilterOptions.value)
})

function applyFilters() {
  initialFilterOptions.value = { ...editableFilterOptions.value }
  emit('filterOptionsChange', initialFilterOptions.value)
  visible.value = false
  showToast()
}
</script>

<template>
  <div class="flex justify-center">
    <Toast />
    <Button label="Filters" @click="visible = true" />

    <Dialog
      v-model:visible="visible" modal header="Adjust filter options" :style="{ width: '25rem' }"
      :closable="false"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="price" class="font-semibold w-24">Price range</label>
        <div class="flex flex-col items-center w-56">
          <span class="mb-2">{{ priceValue[0] }} - {{ priceValue[1] }}</span>
          <Slider v-model="priceValue" :min="1" :max="10000" :step="10" range class="w-full" />
        </div>
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="category" class="font-semibold w-24">Category</label>
        <Select
          v-model="selectedCategory" :options="props.categories" show-clear option-label="name"
          placeholder="Select Category" class="w-full md:w-56"
        />
      </div>

      <div class="flex justify-between w-full">
        <Button type="button" label="Reset" severity="secondary" @click="resetFilters" />

        <div class="flex gap-2">
          <Button type="button" label="Cancel" severity="danger" @click="cancelFilters" />
          <Button type="button" label="Apply" :disabled="isApplyDisabled" @click="applyFilters" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
