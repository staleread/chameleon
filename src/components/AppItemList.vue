<!-- src/components/AppItemList.vue -->
<template>
  <div class="item-list">
    <div class="grid">
      <div class="grid-item" v-for="item in items" :key="item.id">
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

<script lang="ts">
import { defineComponent } from 'vue';
import AppItemCard from './AppItemCard.vue';
import { Item } from '../types/model.types';

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
  emits: ['item-click', 'item-wish-status-change', 'item-add-to-cart'],
  methods: {
    onItemClick(itemId: number) {
      this.$emit('item-click', itemId);
    },
    onItemWishStatusChange(itemId: number, isWish: boolean) {
      this.$emit('item-wish-status-change', itemId, isWish);
    },
    onItemAddToCart(itemId: number) {
      this.$emit('item-add-to-cart', itemId);
    },
  },
});
</script>

<style scoped>
.item-list {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid-item {
  display: flex;
  justify-content: center;
}
</style>
