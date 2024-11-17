<template>
  <div class="flex justify-between items-center mt-4 p-4 border-t">
    <div class="text-xl font-semibold">Загальна сума: ${{ total.toFixed(2) }}</div>
    <Button label="Оформити замовлення" @click="$emit('checkout')" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

const props = defineProps<{
  total: number;
}>();

const emit = defineEmits<{
  (e: 'checkout'): void;
}>();
</script>
