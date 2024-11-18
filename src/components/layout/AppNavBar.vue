<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import MenuBar from 'primevue/menubar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeRoute = ref(router.currentRoute.value.path)

const items = ref<MenuItem[]>([
  {
    label: 'Catalog',
    icon: 'pi pi-shopping-bag',
    command: () => {
      router.push('/chameleon/')
      activeRoute.value = '/chameleon/'
    },
  },
  {
    label: 'Cart',
    icon: 'pi pi-shopping-cart',
    command: () => {
      router.push('/chameleon/cart')
      activeRoute.value = '/chameleon/cart'
    },
  },
  {
    label: 'Wish List',
    icon: 'pi pi-heart',
    command: () => {
      router.push('/chameleon/wish-list')
      activeRoute.value = '/chameleon/wish-list'
    },
  },
])
</script>

<template>
  <div class="sm:p-5">
    <MenuBar
      :model="items"
    >
      <template #start>
        <img src="/logo.png" alt="Logo" class="h-8 w-8">
      </template>
    </MenuBar>
  </div>
</template>
