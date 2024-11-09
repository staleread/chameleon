<script setup lang="ts">
import type { ItemSuggestion } from '../types/model.types'
import { defineProps } from 'vue'

defineProps<{ item: ItemSuggestion }>()
</script>

<template>
  <div class="flex flex-col">
    <span class="text-lg font-bold text-gray-600">{{ item.title }}</span>
    <span class="text-sm text-gray-400">{{ item.categoryName }}</span>
  </div>
</template>
