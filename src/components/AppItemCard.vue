<script setup lang="ts">
import type { Item } from '../types/model.types'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const { item } = defineProps<{ item: Omit<Item, 'id'> }>()

defineEmits<{
  (e: 'itemClick'): void
  (e: 'itemWishStatusChange', isWish: boolean): void
  (e: 'itemAddToCart'): void
}>()
</script>

<template>
  <div
    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
  >
    <div class="bg-surface-50 flex justify-center rounded">
      <div class="relative mx-auto">
        <img
          class="rounded w-full max-w-96 cursor-pointer"
          :src="item.imageUrl"
          draggable="false"
          @click="$emit('itemClick')"
        >
      </div>
    </div>
    <div class="pt-6">
      <div>
        <Tag severity="secondary" :value="item.categoryName" />
        <div
          class="text-lg font-medium mt-1 hover:underline cursor-pointer"
          @click="$emit('itemClick')"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="flex flex-col gap-6 mt-6">
        <span class="text-2xl font-semibold">${{ item.price }}</span>
        <div class="flex gap-2">
          <Button
            icon="pi pi-shopping-cart"
            label="Add to Cart"
            class="flex-auto whitespace-nowrap"
            @click.stop="$emit('itemAddToCart')"
          />
          <Button
            :icon="item.isWished ? 'pi pi-heart-fill' : 'pi pi-heart'"
            outlined
            @click.stop="$emit('itemWishStatusChange', !item.isWished)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
