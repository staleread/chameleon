<script lang="ts">
import { defineComponent } from 'vue';
import type { Item } from '../types/model.types';
import AppItemCard from './AppItemCard.vue';

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
    'itemClick': (itemId: number) => true,
    'itemWishStatusChange': (itemId: number, isWish: boolean) => true,
    'itemAddToCart': (itemId: number) => true,
  },
  setup(props, { emit }) {
    const onItemClick = (itemId: number) => {
      emit('itemClick', itemId);
    };

    const onItemWishStatusChange = (itemId: number, isWish: boolean) => {
      emit('itemWishStatusChange', itemId, isWish);
    };

    const onItemAddToCart = (itemId: number) => {
      emit('itemAddToCart', itemId);
    };

    return {
      onItemClick,
      onItemWishStatusChange,
      onItemAddToCart,
    };
  },
});
</script>

<template>
  <div class="item-list">
    <div class="grid">
      <div v-for="item in items" :key="item.id" class="grid-item">
        <AppItemCard
            :item="item"
            @itemClick="onItemClick"
            @itemWishStatusChange="onItemWishStatusChange"
            @itemAddToCart="onItemAddToCart"
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.grid-item {
  display: flex;
  justify-content: center;
}
</style>
