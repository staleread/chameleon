<script setup lang="ts">
import type { CartItem } from '@/types/model.types'
import InputNumber from 'primevue/inputnumber'
import { computed } from 'vue'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'amountChange', newAmount: number): void
}>()

const amount = computed({
  get: () => props.item.amount || 0,
  set: (value: number) => emit('amountChange', value),
})
</script>

<template>
  <div class="flex p-4 border-b sm:flex-row flex-col sm:items-center items-stretch gap-4">
    <img :src="item.imageUrl" alt="Зображення товару" class="w-20 h-20 object-cover mr-4">

    <div class="flex-1">
      <h2 class="text-lg font-semibold">
        {{ item.title }}
      </h2>
      <p class="text-gray-600">
        ${{ item.price.toFixed(2) }} за одиницю
      </p>
    </div>

    <div class="w-full sm:w-auto">
      <InputNumber
        v-model="amount"
        :min="0"
        show-buttons
        button-layout="horizontal"
      >
        <template #incrementbuttonicon>
          <span class="pi pi-plus" />
        </template>
        <template #decrementbuttonicon>
          <span class="pi pi-minus" />
        </template>
      </InputNumber>
    </div>
  </div>
</template>
