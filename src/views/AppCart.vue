<script setup lang="ts">
import type { CartItem } from '@/types/model.types'
import { calculateTotal, getCartInfo } from '@/api/item.api'
import AppCartItemList from '@/components/AppCartItemList.vue'
import AppCartTotal from '@/components/AppCartTotal.vue'
import { addItemToCart, removeItemFromCart } from '@/storage/cart.storage'
import Toast from 'primevue/toast'
import { onMounted, ref } from 'vue'

const cartItems = ref<CartItem[]>([])
const total = ref<number>(0)
const isLoading = ref<boolean>(true)

async function loadCartInfo() {
  try {
    const cartInfo = await getCartInfo()
    cartItems.value = cartInfo.items
    total.value = cartInfo.total
  }
  catch (error) {
    console.error('Помилка завантаження кошика:', error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCartInfo()
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

    total.value = calculateTotal(cartItems.value)
  }
}

const toast = ref()

function onCheckout() {
  toast.value.add({
    severity: 'warn',
    summary: 'Увага',
    detail: 'Функція в розробці',
    life: 3000,
  })
}
</script>

<template>
  <div class="container mt-4">
    <h1>Кошик</h1>
    <AppCartItemList
      :items="cartItems"
      :is-loading="isLoading"
      @item-amount-change="onItemAmountChange"
    />
    <AppCartTotal :total="total" @checkout="onCheckout" />
    <Toast ref="toast" />
  </div>
</template>
