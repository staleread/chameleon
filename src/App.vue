<script setup lang="ts">
import type { Item } from './types/model.types'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import { getAllItems } from './api/item.api'
import AppItemList from './components/AppItemList.vue'

const items = ref<Item[]>([])

onMounted(() => items.value = getAllItems())

const toast = useToast()

function handleItemClick(itemId: number) {
  const item = items.value.find(i => i.id === itemId)!

  toast.add({
    severity: 'success',
    summary: `${item.title} was clicked`,
    life: 3000,
  })
}

function handleItemWishStatusChange(itemId: number, isWish: boolean) {
  const item = items.value.find(i => i.id === itemId)!

  toast.add({
    severity: 'info',
    summary: isWish
      ? `${item.title} Added to Wish List`
      : `${item.title} Removed from Wish List`,
    life: 3000,
  })

  items.value[items.value.indexOf(item)].isWished = isWish
}

function handleItemAddToCart(itemId: number) {
  const item = items.value.find(i => i.id === itemId)!

  toast.add({
    severity: 'success',
    summary: `${item.title} Added to Cart`,
    life: 3000,
  })
}
</script>

<template>
  <div>
    <Toast />
    <AppItemList
      :items="items"
      @item-click="handleItemClick"
      @item-wish-status-change="handleItemWishStatusChange"
      @item-add-to-cart="handleItemAddToCart"
    />
  </div>
</template>
