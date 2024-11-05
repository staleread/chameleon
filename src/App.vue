<script setup lang="ts">
import Filters from '../src/components/AppFilterDialogComponent.vue'

const filterOptions: ItemFilterOptions = {  // це для тесту
  minPrice: 1,
  maxPrice: 10000,
  categoryId: null,
};

const categories: ItemCategory[] = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Books' },
  { id: 3, name: 'Clothing' },
  { id: 4, name: 'Garden' },

];

</script>

<template>
  Hello, Chameleon!
  <div>
    <Filters :filter-options="filterOptions" :categories="categories" />
  </div>
</template>
