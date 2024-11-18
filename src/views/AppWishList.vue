<script setup lang="ts">
import type { Item } from '@/types/model.types'
import { getWishedItems } from '@/api/item.api'
import AppItemList from '@/components/AppItemList.vue'
import useLoading from '@/composables/useLoading'
import router from '@/router/router'
import { addItemToCart } from '@/storage/cart.storage'
import { addItemToWishList, removeItemFromWishList } from '@/storage/wish-list.storage'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const wishListItems = ref<Item[]>([])
const toast = useToast()

const isLoading = useLoading({
  watcher: async () => {
    const items = await getWishedItems()
    wishListItems.value = items
  },
  onError: () => {
    toast.add({
      summary: 'Oops...',
      detail: 'Error loading wishlist',
      severity: 'error',
      life: 3000,
    })
  },
})

function handleItemClick(itemId: number) {
  router.push(`/chameleon/item/${itemId}`)
}

function handleItemWishStatusChange(itemId: number, isWish: boolean) {
  const item = wishListItems.value.find((i: Item) => i.id === itemId)

  if (!item) {
    return
  }

  if (isWish) {
    addItemToWishList(itemId)
    item.isWished = true
  }
  else {
    removeItemFromWishList(itemId)
    wishListItems.value = wishListItems.value.filter((i: Item) => i.id !== itemId)
    item.isWished = false
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
        @click="router.push('/chameleon/')"
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
