<script setup lang="ts">
import type { Item } from './types/model.types'
import { onMounted, ref } from 'vue'
import { getAllItems } from './api/item.api'
import AppItemList from './components/AppItemList.vue'
import AppPaginator from './components/ui/AppPaginator.vue'

// Реактивні змінні
const items = ref<Item[]>([])
const isLoading = ref<boolean>(true)
const pageNumber = ref<number>(1)
const hasNext = ref<boolean>(false)

const itemsPerPage = 12 // Кількість товарів на сторінку

// Функція для отримання даних
async function fetchData() {
  isLoading.value = true
  try {
    const result = await getAllItems(pageNumber.value, itemsPerPage)
    items.value = result.items
    hasNext.value = result.hasNext
  }
  catch (error) {
    console.error('Помилка завантаження даних:', error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

// Обробник події зміни сторінки
function onPageChange(newPageNumber: number) {
  pageNumber.value = newPageNumber
  fetchData()
}
</script>

<template>
  <div id="app">
    <!-- Основний контент -->
    <div class="container mt-4">
      <!-- Список товарів -->
      <AppItemList :items="items" :is-loading="isLoading" />

      <!-- Пагінатор -->
      <AppPaginator
        :page-number="pageNumber"
        :has-next="hasNext"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>
