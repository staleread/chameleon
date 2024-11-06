<script setup lang="ts">
import type { Item } from '../types/model.types'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const props = defineProps<{ item: Item }>()

const emit = defineEmits<{
  (e: 'itemClick', itemId: number): void
  (e: 'itemWishStatusChange', itemId: number, isWish: boolean): void
  (e: 'itemAddToCart', itemId: number): void
}>()

const isWish = ref(false)
const toast = useToast()

function onCardClick() {
  emit('itemClick', props.item.id)
}

function toggleWishList() {
  isWish.value = !isWish.value
  emit('itemWishStatusChange', props.item.id, isWish.value)
  toast.add({
    severity: 'info',
    summary: isWish.value ? 'Added to Wish List' : 'Removed from Wish List',
    detail: props.item.title,
    life: 3000,
  })
}

function addToCart() {
  emit('itemAddToCart', props.item.id)
}
</script>

<template>
  <div
    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
    @click="onCardClick"
  >
    <div class="bg-surface-50 flex justify-center rounded">
      <div class="relative mx-auto">
        <img class="rounded w-full max-w-96" :src="item.imageUrl" draggable="false">
      </div>
    </div>
    <div class="pt-6">
      <div>
        <Tag severity="secondary" :value="item.categoryName" />
        <div class="text-lg font-medium mt-1">
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
            @click.stop="addToCart"
          />
          <Button
            :icon="isWish ? 'pi pi-heart-fill' : 'pi pi-heart'"
            outlined
            @click.stop="toggleWishList"
          />
        </div>
      </div>
    </div>
  </div>
</template>
