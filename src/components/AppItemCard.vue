<script setup lang="ts">
import type { Item } from '../types/model.types'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const props = defineProps<{ item: Item }>()

const emit = defineEmits<{
  (e: 'itemClick', itemId: number): void
  (e: 'itemWishStatusChange', itemId: number, isWish: boolean): void
  (e: 'itemAddToCart', itemId: number): void
}>()

const isWish = ref(false)
const toast = useToast()

function onCardClick() {
  emit('itemClick', props.item.id)
}

function toggleWishList() {
  isWish.value = !isWish.value
  emit('itemWishStatusChange', props.item.id, isWish.value)
  toast.add({
    severity: 'info',
    summary: isWish.value ? 'Added to Wish List' : 'Removed from Wish List',
    detail: props.item.title,
    life: 3000,
  })
}

function addToCart() {
  emit('itemAddToCart', props.item.id)
}

function onTitleClick(event: Event) {
  event.stopPropagation()
}
</script>

<template>
  <div class="item-card" @click="onCardClick">
    <div class="image-container">
      <img :src="item.imageUrl" alt="Item Image" draggable="false" class="item-image">
    </div>
    <div class="item-details">
      <Tag :value="item.categoryName" class="category-tag" />
      <h3 class="item-title" @click.stop="onTitleClick">
        {{ item.title }}
      </h3>
      <p class="price">
        ${{ item.price }}
      </p>
      <div class="buttons">
        <Button label="Buy Now" icon="pi pi-shopping-cart" class="cart-button" @click.stop="addToCart" />
        <Button :icon="isWish ? 'pi pi-heart-fill' : 'pi pi-heart'" class="wish-button" @click.stop="toggleWishList" />
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
  width: 400px;
  height: 300px;
}

.item-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  padding: 0.5rem;
  text-align: center;
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

.wish-button{
  font-size: 1.5rem;
}
</style>
