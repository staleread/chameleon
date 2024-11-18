<script setup lang="ts">
import type { Item, ItemFilterOptions, ItemSuggestion } from '@/types/model.types'
import type { AutoCompleteOptionSelectEvent } from 'primevue/autocomplete'
import { getAllCategories } from '@/api/category.api'
import { getPaginatedItems } from '@/api/item.api'
import { getItemSuggestions } from '@/api/suggestion.api'
import AppFilterOptionsDialog from '@/components/AppFilterOptionsDialog.vue'
import AppItemList from '@/components/AppItemList.vue'
import AppItemSearchEntry from '@/components/AppItemSearchEntry.vue'
import AppPaginator from '@/components/ui/AppPaginator.vue'
import useLoading from '@/composables/useLoading'
import { addItemToCart } from '@/storage/cart.storage'
import { addItemToWishList, removeItemFromWishList } from '@/storage/wish-list.storage'
import AutoComplete from 'primevue/autocomplete'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref, toRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const ITEMS_PER_PAGE = 12
const DEFAULT_PAGE_NUMBER = 1
const MIN_PRICE = 0
const MAX_PRICE = 1000
const MIN_QUERY_LENGTH = 4
const DEBOUNCE_DELAY = 300

const toast = useToast()
const router = useRouter()
const route = useRoute()

const items = ref<Item[]>([])
const pageNumber = ref(DEFAULT_PAGE_NUMBER)
const hasNextPage = ref(false)
const filterOptions = ref<ItemFilterOptions>({
  categoryId: undefined,
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
})
const suggestions = ref<ItemSuggestion[]>([])

const isItemPaginationLoading = useLoading({
  watcher: async () => {
    const paginationData = await getPaginatedItems(
      pageNumber.value,
      ITEMS_PER_PAGE,
      toRaw(filterOptions.value),
    )
    items.value = paginationData.items
    hasNextPage.value = paginationData.hasNext
  },
  onError: () => {
    toast.add({
      summary: 'Error',
      detail: 'Failed to fetch items',
      severity: 'error',
      life: 3000,
    })
  },
})

async function search({ query }: { query: string }) {
  suggestions.value = await getItemSuggestions(query)
}

function handleSearchOptionSelected({ value }: AutoCompleteOptionSelectEvent) {
  router.push(`/item/${value.id}`)
}

function handleItemClick(itemId: number) {
  router.push(`/item/${itemId}`)
}

function handleItemWishStatusChange(itemId: number, isWish: boolean) {
  isWish ? addItemToWishList(itemId) : removeItemFromWishList(itemId)
  const item = items.value.find((i: Item) => i.id === itemId)
  if (item) {
    item.isWished = isWish
  }
  toast.add({
    summary: 'Wishlist',
    detail: isWish ? 'Added to wishlist' : 'Removed from wishlist',
    severity: 'info',
    life: 3000,
  })
}

function handleItemAddToCart(itemId: number) {
  addItemToCart(itemId)
  toast.add({
    summary: 'Cart',
    detail: 'Added to cart',
    severity: 'success',
    life: 3000,
  })
}

function handleFilterOptionsChange(newFilterOptions: ItemFilterOptions) {
  filterOptions.value = newFilterOptions
  updateUrlQuery(newFilterOptions)
  toast.add({
    summary: 'Filter',
    detail: 'Filter options changed',
    severity: 'info',
    life: 3000,
  })
}

function updateUrlQuery(options: ItemFilterOptions) {
  router.replace({
    query: {
      ...(options.categoryId && { category: options.categoryId.toString() }),
      ...(options.minPrice !== MIN_PRICE && { minPrice: options.minPrice.toString() }),
      ...(options.maxPrice !== MAX_PRICE && { maxPrice: options.maxPrice.toString() }),
    },
  })
}

function parseQueryToFilters(query: Record<string, string>) {
  return {
    categoryId: query.category ? Number.parseInt(query.category) : undefined,
    minPrice: query.minPrice ? Number.parseInt(query.minPrice) : MIN_PRICE,
    maxPrice: query.maxPrice ? Number.parseInt(query.maxPrice) : MAX_PRICE,
  }
}

watch(
  () => route.query,
  (newQuery) => {
    filterOptions.value = parseQueryToFilters(newQuery as Record<string, string>)
  },
)

onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    filterOptions.value = parseQueryToFilters(route.query as Record<string, string>)
  }
})
</script>

<template>
  <Toast />
  <div class="w-full flex justify-between">
    <AutoComplete
      v-tooltip.bottom.hover="'At least 4 characters'"
      force-selection
      placeholder="Search"
      option-label="title"
      :min-length="MIN_QUERY_LENGTH"
      :delay="DEBOUNCE_DELAY"
      :suggestions="suggestions"
      @complete="search"
      @option-select="handleSearchOptionSelected"
    >
      <template #option="slotProps">
        <AppItemSearchEntry :item="slotProps.option" />
      </template>
    </AutoComplete>
    <AppFilterOptionsDialog
      :filter-options="filterOptions"
      :min-price="MIN_PRICE"
      :max-price="MAX_PRICE"
      :fetch-categories="getAllCategories"
      @filter-options-change="handleFilterOptionsChange"
      @fetch-categories-fail="isItemPaginationLoading = false"
    />
  </div>
  <AppItemList
    :items="items"
    :is-loading="isItemPaginationLoading"
    @item-click="handleItemClick"
    @item-wish-status-change="handleItemWishStatusChange"
    @item-add-to-cart="handleItemAddToCart"
  />
  <div class="w-full flex justify-center">
    <AppPaginator
      :page-number="pageNumber"
      :has-next="hasNextPage"
      @page-change="pageNumber = $event"
    />
  </div>
</template>
