<script setup lang="ts">
import type { Item } from '../types/model.types'
import AppItemCard from './AppItemCard.vue'

defineProps<{ items: Item[] }>()

const emit = defineEmits<{
  (e: 'itemClick', itemId: number): void
  (e: 'itemWishStatusChange', itemId: number, isWish: boolean): void
  (e: 'itemAddToCart', itemId: number): void
}>()

function onItemClick(itemId: number) {
  emit('itemClick', itemId)
}

function onItemWishStatusChange(itemId: number, isWish: boolean) {
  emit('itemWishStatusChange', itemId, isWish)
}

function onItemAddToCart(itemId: number) {
  emit('itemAddToCart', itemId)
}
</script>

<template>
  <div class="item-list">
    <div class="grid">
      <div v-for="item in items" :key="item.id" class="grid-item">
        <AppItemCard
          :item="item"
          @item-click="onItemClick"
          @item-wish-status-change="onItemWishStatusChange"
          @item-add-to-cart="onItemAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-list {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Адаптивність */
  gap: 1.5rem;
}

.grid-item {
  display: flex;
  justify-content: center;
}
</style>
