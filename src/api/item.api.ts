import type { ItemDto } from '@/types/dto.types'
import type { CartInfo, CartItem, Item, ItemBase, ItemFilterOptions, WishListEntry } from '@/types/model.types'
import type { Paginated } from '@/types/pagination.types'
import config from '@/config'
import { getCartEntries } from '@/storage/cart.storage'
import { getWishListEntries, isItemInWishList } from '@/storage/wish-list.storage'
import axios from 'axios'

export async function getItemById(itemId: number): Promise<ItemBase> {
  const response = await axios.get(`${config.api.baseUrl}/products/${itemId}`)
  const dto = response.data

  return {
    id: dto.id,
    title: dto.title,
    price: dto.price,
    categoryName: dto.category.name,
    imageUrl: dto.images[0],
  }
}

export async function getCartInfo(): Promise<CartInfo> {
  const cartEntries = getCartEntries()

  if (cartEntries.length === 0) {
    return { total: 0, items: [] }
  }

  const cartItemPromises: Promise<CartItem>[] = cartEntries.map(async (entry) => {
    const item = await getItemById(entry.itemId)
    return { ...item, amount: entry.amount }
  })
  const cartItems: CartItem[] = (await Promise.allSettled(cartItemPromises))
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value)

  const total = calculateCartTotal(cartItems)

  return { total, items: cartItems }
}

export function calculateCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.price * item.amount, 0)
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

export async function getWishedItemById(itemId: number): Promise<Item> {
  const item = await getItemById(itemId)
  return { ...item, isWished: isItemInWishList(itemId) }
}

export async function getWishedItems(): Promise<Item[]> {
  const wishListEntries: WishListEntry[] = getWishListEntries()

  if (wishListEntries.length === 0) {
    return []
  }

  const wishListPromises: Promise<Item>[] = wishListEntries.map(async (entry) => {
    const item = await getItemById(entry.itemId)
    return { ...item, isWished: true }
  })

  const wishedItems = (await Promise.allSettled(wishListPromises))
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value)

  return wishedItems
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
