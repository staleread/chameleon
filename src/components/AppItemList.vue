<script setup lang="ts">
import type { Item } from '../types/model.types'
import AppItemCard from './AppItemCard.vue'

const props = defineProps<{ items: Item[] }>()

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
  <div class="grid grid-cols-12 gap-4">
    <div
      v-for="item in props.items"
      :key="item.id"
      class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2"
    >
      <AppItemCard
        :item="item"
        @item-click="onItemClick"
        @item-wish-status-change="onItemWishStatusChange"
        @item-add-to-cart="onItemAddToCart"
      />
    </div>
  </div>
</template>
