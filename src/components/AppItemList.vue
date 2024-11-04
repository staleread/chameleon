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
  emits: ['itemClick', 'itemWishStatusChange', 'itemAddToCart'],
  methods: {
    onItemClick(itemId: number) {
      this.$emit('itemClick', itemId)
    },
    onItemWishStatusChange(itemId: number, isWish: boolean) {
      this.$emit('itemWishStatusChange', itemId, isWish)
    },
    onItemAddToCart(itemId: number) {
      this.$emit('itemAddToCart', itemId)
    },
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
  grid-template-columns: repeat(4, 1fr); /* Три елементи в ряд */
  gap: 1.5rem; /* Відступи між елементами */
}

.grid-item {
  display: flex;
  justify-content: center;
}
</style>
