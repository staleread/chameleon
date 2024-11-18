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
  <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col items-center md:flex-row gap-6">
    <div class="flex-shrink-0">
      <img
        class="rounded w-64 h-64 object-cover cursor-pointer"
        :src="item.imageUrl"
        draggable="false"
        @click="$emit('itemClick')"
      >
    </div>

    <div class="flex flex-col justify-between flex-1">
      <div>
        <Tag severity="secondary" :value="item.categoryName" />
        <div
          class="text-xl font-medium mt-2 hover:underline cursor-pointer"
          @click="$emit('itemClick')"
        >
          {{ item.title }}
        </div>
        <!-- <div class="text-xl mt-4">
          ${{ item.description }}
        </div> -->
        <div class="text-2xl font-semibold mt-4">
          ${{ item.price }}
        </div>
      </div>

      <div class="flex gap-2 mt-4">
        <Button
          icon="pi pi-shopping-cart"
          label="Add to Cart"
          class="flex-1"
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
</template>
