<script setup lang="ts">
import type { CartItem } from '@/types/model.types'
import InputNumber from 'primevue/inputnumber'
import { ref, watch } from 'vue'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'amountChange', newAmount: number): void
}>()

const localAmount = ref<number>(props.item.amount)

watch(
  () => props.item.amount,
  (newVal) => {
    localAmount.value = newVal
  },
)

function onAmountChange() {
  emit('amountChange', localAmount.value)
}
</script>

<template>
  <div class="flex items-center p-4 border-b">
    <img :src="item.imageUrl" alt="Зображення товару" class="w-20 h-20 object-cover mr-4">

    <div class="flex-1">
      <h2 class="text-lg font-semibold">
        {{ item.title }}
      </h2>
      <p class="text-gray-600">
        ${{ item.price.toFixed(2) }} за одиницю
      </p>
    </div>

    <div class="w-32">
      <InputNumber
        v-model.number="localAmount"
        :min="0"
        :show-buttons="true"
        @change="onAmountChange"
      />
    </div>
  </div>
</template>
