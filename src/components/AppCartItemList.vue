<template>
  <div>
    <template v-if="isLoading">
      <AppCartItemCardSkeleton v-for="n in skeletonCount" :key="n" />
    </template>
    <template v-else>
      <AppCartItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          @amount-change="(newAmount) => $emit('item-amount-change', item.id, newAmount)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import AppCartItemCard from '@/components/AppCartItemCard.vue';
import AppCartItemCardSkeleton from '@/components/AppCartItemCardSkeleton.vue';
import type { CartItem } from '@/types/model.types';

const props = defineProps<{
  items: CartItem[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'item-amount-change', itemId: number, newAmount: number): void;
}>();

const skeletonCount = 5;
</script>
