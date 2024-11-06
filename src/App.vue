<script lang="ts">
import type { Item } from './types/model.types'
import Toast from 'primevue/toast'
import { defineComponent, ref } from 'vue'
import AppItemCard from './components/AppItemCard.vue'
import AppItemList from './components/AppItemList.vue'

export default defineComponent({
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AppItemCard,
    Toast,
    AppItemList,
  },
  setup() {
    // приклад для показу
    const items = ref<Item[]>([
      {
        id: 1,
        title: 'Product 1',
        price: 29.99,
        categoryName: 'Electronics',
        imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
      },
      {
        id: 2,
        title: 'Product 2',
        price: 59.99,
        categoryName: 'Books',
        imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
      },
      {
        id: 3,
        title: 'Product 3',
        price: 19.99,
        categoryName: 'Home',
        imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
      },
      {
        id: 4,
        title: 'Product 4',
        price: 19.99,
        categoryName: 'Home',
        imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
      },
    ])

    const handleItemClick = (_itemId: number) => {
      // console.log(`Item clicked: ${itemId}`);
    }

    const handleItemWishStatusChange = (_itemId: number, _isWish: boolean) => {
      // console.log(`Item ${itemId} wish status changed: ${isWish}`);
    }

    const handleItemAddToCart = (_itemId: number) => {
      // console.log(`Item added to cart: ${itemId}`)
    }

    return {
      items,
      handleItemClick,
      handleItemWishStatusChange,
      handleItemAddToCart,
    }
  },
})
</script>

<template>
  <div>
    <Toast />
    <h1>Item List</h1>
    <AppItemList
      :items="items"
      @item-click="handleItemClick"
      @item-wish-status-change="handleItemWishStatusChange"
      @item-add-to-cart="handleItemAddToCart"
    />
  </div>
</template>

<style scoped>
h1, h2 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
