<script setup lang="ts">
import type { ItemSuggestion } from '../types/model.types'
import AutoComplete from 'primevue/autocomplete'
import { ref } from 'vue'
import { getItemSuggestions } from '../api/item.api.ts'
import AppItemSearchEntry from '../components/AppItemSearchEntry.vue'

const selectedItem = ref<ItemSuggestion | null>(null)
const filteredItems = ref<ItemSuggestion[]>([])

let searchTimeout: ReturnType<typeof setTimeout> | null = null

function search(event: { query: string }) {
  const query = event.query.trim()

  if (searchTimeout)
    clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    if (query.length >= 4) {
      try {
        filteredItems.value = await getItemSuggestions(query)
      }
      catch (error) {
        console.error('Помилка при отриманні даних:', error)
      }
    }
    else {
      filteredItems.value = []
    }
  }, 500)
}
</script>

<template>
  <div class="flex justify-center autocomplete-container">
    <AutoComplete
      v-model="selectedItem"
      v-tooltip.hover="'At least 4 characters'"
      option-label="title"
      :suggestions="filteredItems"
      placeholder="Search"
      force-selection
      @complete="search"
    >
      <template #option="slotProps">
        <AppItemSearchEntry :item="slotProps.option" />
      </template>
    </AutoComplete>
    <span>
      <img src="../images/icon-search.svg" alt="Search Icon" class="w-8 h-8 mt-[4px]">
    </span>
  </div>
</template>
