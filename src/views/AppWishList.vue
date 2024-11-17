<!-- WishListPage.vue -->
<script setup lang="ts">
import type { Item } from '@/types/model.types'
import { getWishedItems } from '@/api/item.api'
import AppItemList from '@/components/AppItemList.vue'
import router from '@/router/router'
import { addItemToCart } from '@/storage/cart.storage'
import { addItemToWishList, removeItemFromWishList } from '@/storage/wish-list.storage'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

const isLoading = ref(true)
const wishListItems = ref<Item[]>([])
const toast = useToast()

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

onMounted(() => {
  loadWishListItems()
})

function handleItemClick(itemId: number) {
  router.push(`/item/${itemId}`)
}

function handleItemWishStatusChange(itemId: number, isWish: boolean) {
  isWish ? addItemToWishList(itemId) : removeItemFromWishList(itemId)
  const item = wishListItems.value.find((i: Item) => i.id === itemId)
  if (item) {
    item.isWished = isWish
  }
  toast.add({
    summary: 'Wishlist',
    detail: isWish ? 'Added to wishlist' : 'Removed from wishlist',
    severity: 'info',
    life: 3000,
  })
}

function handleItemAddToCart(itemId: number) {
  addItemToCart(itemId)
  toast.add({
    summary: 'Cart',
    detail: 'Added to cart',
    severity: 'success',
    life: 3000,
  })
}
</script>

<template>
  <Toast />
  <div class="flex flex-col">
    <div v-if="wishListItems.length === 0 && !isLoading" class="text-center mt-[100px] text-4xl font-bold">
      <p class="mb-10">
        Your Wish List is empty!
      </p>
      <Button
        label="Go to Catalog"
        icon="pi pi-shopping-bag"
        severity="primary"
        @click="router.push('/')"
      />
    </div>
    <div v-else>
      <p class="text-4xl font-bold mb-6">
        This is your wish-list
      </p>
      <AppItemList
        :items="wishListItems"
        :is-loading="isLoading"
        @item-click="handleItemClick"
        @item-wish-status-change="handleItemWishStatusChange"
        @item-add-to-cart="handleItemAddToCart"
      />
    </div>
  </div>
</template>
