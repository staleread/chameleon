<!-- src/components/AppItemCard.vue -->
<template>
  <div class="item-card" @click="onCardClick">
    <img :src="item.imageUrl" alt="Item Image" draggable="false" />
    <h3 @click.stop="onTitleClick">{{ item.title }}</h3>
    <span class="category-tag">{{ item.categoryName }}</span>
    <p class="price">${{ item.price }}</p>
    <div class="buttons">
      <button class="cart-button" @click.stop="addToCart">
          Add To Cart
      </button>
      <button class="wish-button" @click.stop="toggleWishList">
        <i :class="['pi', isWish ? 'pi-heart-fill' : 'pi-heart']"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Item } from '../types/model.types';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'AppItemCard',
  props: {
    item: {
      type: Object as () => Item,
      required: true,
    },
  },
  emits: ['item-click', 'item-wish-status-change', 'item-add-to-cart'],
  setup(props, { emit }) {
    const isWish = ref(false);
    const toast = useToast();

    const onCardClick = () => {
      emit('item-click', props.item.id);
    };

    const toggleWishList = () => {
      isWish.value = !isWish.value;
      emit('item-wish-status-change', props.item.id, isWish.value);
      toast.add({
        severity: 'info',
        summary: isWish.value ? 'Added to Wish List' : 'Removed from Wish List',
        detail: props.item.title,
        life: 3000,
      });
    };

    const addToCart = () => {
      emit('item-add-to-cart', props.item.id);
    };

    const onTitleClick = (event: Event) => {
      event.stopPropagation();
      // Additional logic for title click (if any)
    };

    return {
      isWish,
      onCardClick,
      toggleWishList,
      addToCart,
      onTitleClick,
    };
  },
});
</script>

<style scoped>
.item-card {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  position: relative;
  text-align: center;
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.item-card h3 {
  margin: 0.5rem 0;
  cursor: pointer;
}

.item-card h3:hover {
  text-decoration: underline;
}

.category-tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #555;
  padding: 0.25rem 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 16px;
  font-size: 0.85rem;
}

.price {
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.wish-button .pi {
  font-size: 1.5rem;
  color: #ff4081;
}

.cart-button{
  font-size:14px;
  color: white;
  border-radius: 3px;
  font-weight: bolder;
  padding-left:8px;
  padding-right:8px;
  margin-bottom:5px;
  background-color: #3f51b5;
  border: #3f51b5 1px solid;
}

.cart-button:hover{
  font-size: 15px;
  transition: all 0.5s;
  color: #3f51b5;
  background-color: white;
}

.pi-heart-fill {
  color: #ff4081;
}

.pi-heart {
  color: #aaa;
}
</style>
