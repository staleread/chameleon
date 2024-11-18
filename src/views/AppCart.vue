<script setup lang="ts">
import type { CartItem } from '@/types/model.types'
import { calculateCartTotal, getCartInfo } from '@/api/item.api'
import AppCartItemList from '@/components/AppCartItemList.vue'
import AppCartTotal from '@/components/AppCartTotal.vue'
import useLoading from '@/composables/useLoading'
import { addItemToCart, removeItemFromCart } from '@/storage/cart.storage'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const toast = useToast()

const cartItems = ref<CartItem[]>([])
const total = ref<number>(0)

const isLoading = useLoading({
  watcher: async () => {
    const cartInfo = await getCartInfo()
    cartItems.value = cartInfo.items
    total.value = cartInfo.total
  },
  onError: () => {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Помилка завантаження кошика',
      life: 3000,
    })
  },
})

function onItemAmountChange(itemId: number, newAmount: number) {
  const itemIndex = cartItems.value.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    const currentAmount = cartItems.value[itemIndex].amount

    if (newAmount > currentAmount) {
      addItemToCart(itemId)
    }
    else if (newAmount < currentAmount) {
      removeItemFromCart(itemId)
    }

    if (newAmount === 0) {
      cartItems.value.splice(itemIndex, 1)
    }
    else {
      cartItems.value[itemIndex].amount = newAmount
    }

    total.value = calculateCartTotal(cartItems.value)
  }
}

function onCheckout() {
  toast.add({
    severity: 'warn',
    summary: 'Увага',
    detail: 'Функція в розробці',
    life: 3000,
  })
}
</script>

<template>
  <Toast />
  <div class="container mt-4">
    <h1>Кошик</h1>
    <AppCartItemList
      :items="cartItems"
      :is-loading="isLoading"
      @item-amount-change="onItemAmountChange"
    />
    <AppCartTotal v-if="!isLoading && cartItems.length > 0" :total="total" @checkout="onCheckout" />
  </div>
</template>
