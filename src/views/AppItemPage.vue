<script setup lang="ts">
import type { Item } from '@/types/model.types'
import { getWishedItemById } from '@/api/item.api'
import AppAboutItemCard from '@/components/AppAboutItemCard.vue'
import useLoading from '@/composables/useLoading'
import { addItemToCart } from '@/storage/cart.storage'
import { addItemToWishList, removeItemFromWishList } from '@/storage/wish-list.storage'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const toast = useToast()

const item = ref<Item | null>(null)

const isItemLoading = useLoading({
  watcher: async () => {
    const itemId = route.params.id as string
    item.value = await getWishedItemById(Number.parseInt(itemId))
  },
  onError: () => {
    toast.add({
      summary: 'Oops...',
      detail: 'Error loading item',
      severity: 'error',
      life: 3000,
    })
  },
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
  if (!item.value) {
    return
  }

  isWish ? addItemToWishList(itemId) : removeItemFromWishList(itemId)
  item.value.isWished = isWish

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
    <div v-if="isItemLoading" class="text-xl font-bold mb-6">
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
