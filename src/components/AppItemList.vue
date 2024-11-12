<script setup lang="ts">
import type { Item } from '../types/model.types'
import AppItemCard from './AppItemCard.vue'
import AppItemCardSkeleton from './ItemCardSkeleton.vue'

const props = defineProps<{
  items: Item[]
  isLoading: boolean
}>()

defineEmits<{
  (e: 'itemClick', itemId: number): void
  (e: 'itemWishStatusChange', itemId: number, isWish: boolean): void
  (e: 'itemAddToCart', itemId: number): void
}>()

const skeletonCount = 12 // Відповідає itemsPerPage
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <!-- Якщо завантажується, відображаємо скелетони -->
    <template v-if="props.isLoading">
      <div
        v-for="index in skeletonCount"
        :key="`skeleton-${index}`"
        class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2"
      >
        <AppItemCardSkeleton />
      </div>
    </template>
    <!-- Якщо не завантажується, відображаємо товари -->
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
