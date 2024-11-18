import type { ItemDto } from '@/types/dto.types'
import type { CartInfo, CartItem, Item, ItemFilterOptions, WishListEntry } from '@/types/model.types'
import type { Paginated } from '@/types/pagination.types'
import config from '@/config'

import { getCartEntries } from '@/storage/cart.storage'
import { getWishListEntries } from '@/storage/wish-list.storage'
import axios from 'axios'

export async function getCartInfo(): Promise<CartInfo> {
  const cartEntries = getCartEntries()

  if (cartEntries.length === 0) {
    return { total: 0, items: [] }
  }

  // Отримуємо товари за ідентифікаторами
  const itemPromises = cartEntries.map(entry => getItemById(entry.itemId))
  const items = await Promise.all(itemPromises)

  // Мапимо Item до CartItem та додаємо кількість
  const cartItems: CartItem[] = items.map((item) => {
    const amount = cartEntries.find(entry => entry.itemId === item.id)?.amount || 0
    return {
      ...item,
      amount,
    }
  })

  // Обчислюємо загальну суму
  const total = calculateTotal(cartItems)

  return { total, items: cartItems }
}

export function calculateTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.price * item.amount, 0)
}

export async function getItemById(itemId: number): Promise<Item> {
  const response = await axios.get(`${config.api.baseUrl}/products/${itemId}`)
  const dto = response.data

  const isWished = getWishListEntries().some(entry => entry.itemId === dto.id)

  return {
    id: dto.id,
    title: dto.title,
    price: dto.price,
    categoryName: dto.category.name,
    imageUrl: dto.images[0],
    isWished,
  }
}

export async function getPaginatedItems(
  page: number,
  itemsPerPage: number,
  filterOptions: ItemFilterOptions,
): Promise<Paginated<Item>> {
  if (itemsPerPage <= 0) {
    throw new Error('Items per page must be greater than 0')
  }

  let paginatedData = await fetchPaginatedItems(page, itemsPerPage, filterOptions)

  if (paginatedData.items.length > 0) {
    return { ...paginatedData, items: toItems(paginatedData.items) }
  }

  paginatedData = await fetchPaginatedItems(0, itemsPerPage, filterOptions)
  return { ...paginatedData, items: toItems(paginatedData.items) }
}

async function fetchPaginatedItems(
  page: number,
  itemsPerPage: number,
  filterOptions: ItemFilterOptions,
): Promise<Paginated<ItemDto>> {
  const offset = (page - 1) * itemsPerPage
  const limit = itemsPerPage + 1 // +1 for next page availability check

  const response = await axios.get(`${config.api.baseUrl}/products`, {
    params: {
      offset,
      limit,
      categoryId: filterOptions.categoryId,
      price_min: filterOptions.minPrice,
      price_max: filterOptions.maxPrice,
    },
  })

  const data = response.data
  const hasNext = data.length > itemsPerPage

  return { items: data.slice(0, itemsPerPage), hasNext, pageNumber: page }
}

function toItems(data: ItemDto[]): Item[] {
  const wishSet = new Set(getWishListEntries().map((e: WishListEntry) => e.itemId))

  const items = data.map((dto: ItemDto) => ({
    id: dto.id,
    title: dto.title,
    price: dto.price,
    categoryName: dto.category.name,
    imageUrl: dto.images[0],
    isWished: wishSet.has(dto.id),
  }))

  return items
}
