<script setup lang="ts">
import type { ItemSuggestion } from '../types/model.types'
import AutoComplete from 'primevue/autocomplete'
import { ref } from 'vue'
import { getItemSuggestions } from '../api/suggestion.api.ts'
import AppItemSearchEntry from '../components/AppItemSearchEntry.vue'

const MIN_QUERY_LENGTH = 4
const DEBOUNCE_DELAY = 500

const selectedItem = ref<ItemSuggestion | null>(null)
const filteredItems = ref<ItemSuggestion[]>([])

async function search(event: { query: string }) {
  const query = event.query.trim()

  try {
    filteredItems.value = await getItemSuggestions(query)
  }
  catch (error) {
    console.error('Помилка при отриманні даних:', error)
  }
}
</script>

<template>
  <div class="flex justify-center autocomplete-container">
    <AutoComplete
      v-model="selectedItem"
      v-tooltip.hover="'At least 4 characters'"
      force-selection
      placeholder="Search"
      option-label="title"
      :min-length="MIN_QUERY_LENGTH"
      :delay="DEBOUNCE_DELAY"
      :suggestions="filteredItems"
      @complete="search"
    >
      <template #option="slotProps">
        <AppItemSearchEntry :item="slotProps.option" />
      </template>
    </AutoComplete>
  </div>
</template>
