<script lang="ts">
import type { Item } from '../types/model.types'
import { defineComponent } from 'vue'
import AppItemCard from './AppItemCard.vue'

export default defineComponent({
  name: 'AppItemList',
  components: {
    AppItemCard,
  },
  props: {
    items: {
      type: Array as () => Item[],
      required: true,
    },
  },
  emits: {
    itemClick: (_itemId: number) => true,
    itemWishStatusChange: (_itemId: number, _isWish: boolean) => true,
    itemAddToCart: (_itemId: number) => true,
  },
  setup(_props, { emit }) {
    const onItemClick = (itemId: number) => {
      emit('itemClick', itemId)
    }

    const onItemWishStatusChange = (itemId: number, isWish: boolean) => {
      emit('itemWishStatusChange', itemId, isWish)
    }

    const onItemAddToCart = (itemId: number) => {
      emit('itemAddToCart', itemId)
    }

    return {
      onItemClick,
      onItemWishStatusChange,
      onItemAddToCart,
    }
  },
})
</script>

<template>
  <div class="item-list">
    <div class="grid">
      <div v-for="item in items" :key="item.id" class="grid-item">
        <AppItemCard
          :item="item"
          @item-click="onItemClick"
          @item-wish-status-change="onItemWishStatusChange"
          @item-add-to-cart="onItemAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-list {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Адаптивність */
  gap: 1.5rem;
}

.grid-item {
  display: flex;
  justify-content: center;
}
</style>
