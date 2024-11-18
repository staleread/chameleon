<script setup lang="ts">
import type { CartItem } from '@/types/model.types'
import AppCartItemCard from '@/components/AppCartItemCard.vue'
import AppCartItemCardSkeleton from '@/components/AppCartItemCardSkeleton.vue'

defineProps<{
  items: CartItem[]
  isLoading: boolean
}>()

defineEmits<{
  (e: 'itemAmountChange', itemId: number, newAmount: number): void
}>()

const skeletonCount = 5
</script>

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
        @amount-change="(newAmount) => $emit('itemAmountChange', item.id, newAmount)"
      />
    </template>
  </div>
</template>
