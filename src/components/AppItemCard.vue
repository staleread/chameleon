<script lang="ts">
import type { Item } from '../types/model.types'
import { useToast } from 'primevue/usetoast'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AppItemCard',
  props: {
    item: {
      type: Object as () => Item,
      required: true,
    },
  },
  emits: ['itemClick', 'itemWishStatusChange', 'itemAddToCart'],
  setup(props, { emit }) {
    const isWish = ref(false)
    const toast = useToast()

    const onCardClick = () => {
      emit('itemClick', props.item.id)
    }

    const toggleWishList = () => {
      isWish.value = !isWish.value
      emit('itemWishStatusChange', props.item.id, isWish.value)
      toast.add({
        severity: 'info',
        summary: isWish.value ? 'Added to Wish List' : 'Removed from Wish List',
        detail: props.item.title,
        life: 3000,
      })
    }

    const addToCart = () => {
      emit('itemAddToCart', props.item.id)
    }

    const onTitleClick = (event: Event) => {
      event.stopPropagation()
    }

    return {
      isWish,
      onCardClick,
      toggleWishList,
      addToCart,
      onTitleClick,
    }
  },
})
</script>

<template>
  <div class="item-card" @click="onCardClick">
    <div class="image-container">
      <img :src="item.imageUrl" alt="Item Image" draggable="false" class="item-image" />
    </div>
    <div class="item-details">
      <span class="category-tag">{{ item.categoryName }}</span>
      <h3 @click.stop="onTitleClick" class="item-title">
        {{ item.title }}
      </h3>
      <p class="price">${{ item.price }}</p>
      <div class="buttons">
        <button class="cart-button" @click.stop="addToCart">
          <i class="pi pi-shopping-cart"></i> Buy Now
        </button>
        <button class="wish-button" @click.stop="toggleWishList">
          <i class="pi" :class="[isWish ? 'pi-heart-fill' : 'pi-heart']"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.item-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px; /* Задаємо квадратну ширину */
  height: 300px; /* Задаємо квадратну висоту */
}

.item-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%; /* Висота контейнера зображення */
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Щоб зображення заповнювало контейнер */
}

.item-details {
  padding: 0.5rem;
  text-align: center;
}

.category-tag {
  display: block;
  background-color: #f0f0f0;
  color: #333;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.item-title {
  margin: 0.3rem 0;
  font-size: 1rem;
  font-weight: bold;
  transition: text-decoration 0.3s;
}

.item-title:hover {
  text-decoration: underline;
}

.price {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
  margin: 0.3rem 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cart-button {
  background-color: #000;
  color: #fff;
  border: none;
  width: 400px;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
}

.cart-button:hover {
  background-color: #333;
}

.wish-button {
  border-radius: 5px;
  background: none;
  cursor: pointer;
}

.wish-button .pi {
  margin-top: 6px;
  font-size: 1.5rem;
  color: #f00;
}

.pi-heart-fill {
  color: #f00;
}
</style>