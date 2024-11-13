<script setup lang="ts">
import type { Item } from '../types/model.types'
import AppItemCard from './AppItemCard.vue'
import AppItemCardSkeleton from './AppItemCardSkeleton.vue'

const props = defineProps<{
  items: Item[]
  isLoading: boolean
}>()

defineEmits<{
  (e: 'itemClick', itemId: number): void
  (e: 'itemWishStatusChange', itemId: number, isWish: boolean): void
  (e: 'itemAddToCart', itemId: number): void
}>()

const SKELETON_COUNT = 12
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <template v-if="props.isLoading">
      <div
        v-for="index in SKELETON_COUNT"
        :key="`skeleton-${index}`"
        class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2"
      >
        <AppItemCardSkeleton />
      </div>
    </template>
    <template v-else>
      <div
        v-for="item in props.items"
        :key="item.id"
        class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2"
      >
        <AppItemCard
          :item="item"
          @item-click="$emit('itemClick', item.id)"
          @item-wish-status-change="(isWish) => $emit('itemWishStatusChange', item.id, isWish)"
          @item-add-to-cart="$emit('itemAddToCart', item.id)"
        />
      </div>
    </template>
  </div>
</template>
