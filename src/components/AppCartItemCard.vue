<template>
  <div class="flex items-center p-4 border-b">
    <!-- Зображення товару -->
    <img :src="item.imageUrl" alt="Зображення товару" class="w-20 h-20 object-cover mr-4" />

    <!-- Інформація про товар -->
    <div class="flex-1">
      <h2 class="text-lg font-semibold">{{ item.title }}</h2>
      <p class="text-gray-600">${{ item.price.toFixed(2) }} за одиницю</p>
    </div>

    <!-- Введення кількості -->
    <div class="w-32">
      <InputNumber
          v-model.number="localAmount"
          :min="0"
          :showButtons="true"
          @change="onAmountChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import type { CartItem } from '@/types/model.types';

const props = defineProps<{
  item: CartItem;
}>();

const emit = defineEmits<{
  (e: 'amount-change', newAmount: number): void;
}>();

const localAmount = ref<number>(props.item.amount);

watch(
    () => props.item.amount,
    (newVal) => {
      localAmount.value = newVal;
    }
);

const onAmountChange = () => {
  emit('amount-change', localAmount.value);
};
</script>
