<script setup lang="ts">
import type { Item } from '@/types/model.types'
import { getItemById, getWishedItems } from '@/api/item.api'
import AppAboutItemCard from '@/components/AppAboutItemCard.vue'
import { addItemToCart } from '@/storage/cart.storage'
import { addItemToWishList, removeItemFromWishList } from '@/storage/wish-list.storage'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const item = ref<Item | null>(null)
const isLoading = ref(true)
const route = useRoute()
const toast = useToast()
const wishListItems = ref<Item[]>([])

async function loadWishListItems() {
  try {
    const items = await getWishedItems()
    wishListItems.value = items
  }
  catch (error) {
    console.error('Помилка завантаження товарів із Wish List:', error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  const itemId = route.params.id as string
  item.value = await getItemById(itemId)
  isLoading.value = false
  loadWishListItems()
})

function handleItemAddToCart(itemId: number) {
  addItemToCart(itemId)
  toast.add({
    summary: 'Cart',
    detail: 'Added to cart',
    severity: 'success',
    life: 3000,
  })
}

function handleItemWishStatusChange(itemId: number, isWish: boolean) {
  if (item.value) {
    if (isWish) {
      addItemToWishList(itemId)
    }
    else {
      removeItemFromWishList(itemId)
    }
    const updatedItem = wishListItems.value.find((i: Item) => i.id === itemId)
    if (updatedItem) {
      item.value.isWished = isWish
    }
    else {
      const itemToAdd = item.value
      if (itemToAdd) {
        wishListItems.value.push(itemToAdd)
        itemToAdd.isWished = true
      }
    }
  }

  toast.add({
    summary: 'Wishlist',
    detail: isWish ? 'Added to wishlist' : 'Removed from wishlist',
    severity: 'info',
    life: 3000,
  })
}
</script>

<template>
  <Toast />
  <div class="flex flex-col items-center justify-center min-h-[80vh] gap-6">
    <div v-if="isLoading" class="text-xl font-bold mb-6">
      Loading...
    </div>

    <div v-else-if="item">
      <AppAboutItemCard
        :item="item"
        @item-wish-status-change="handleItemWishStatusChange(item.id, !item.isWished)"
        @item-add-to-cart="handleItemAddToCart(item.id)"
      />
    </div>

    <div v-else class="text-4xl font-bold mb-6">
      Item not found
    </div>
  </div>
</template>
