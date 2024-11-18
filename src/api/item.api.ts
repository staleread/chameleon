import type { ItemDto } from '@/types/dto.types'
import type { Item, ItemFilterOptions, WishListEntry } from '@/types/model.types'
import type { Paginated } from '@/types/pagination.types'
import config from '@/config'
import { getWishListEntries } from '@/storage/wish-list.storage'
import axios from 'axios'

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
    // description: dto.description,
    categoryName: dto.category.name,
    imageUrl: dto.images[0],
    isWished: wishSet.has(dto.id),
  }))

  return items
}

export async function getWishedItems(): Promise<Item[]> {
  const wishListEntries: WishListEntry[] = getWishListEntries()
  const itemIds = wishListEntries.map(entry => entry.itemId)

  const items = await Promise.all(
    itemIds.map(async (id) => {
      try {
        const response = await axios.get<ItemDto>(`${config.api.baseUrl}/products/${id}`)
        return response.data
      }
      catch (error) {
        console.error(`Помилка завантаження товару з ID: ${id}`, error)
        return null
      }
    }),
  )

  const validItems = items.filter(item => item !== null) as ItemDto[]
  return toItems(validItems)
}

export async function getItemById(itemId: string): Promise<Item | null> {
  const response = await axios.get<ItemDto>(`${config.api.baseUrl}/products/${itemId}`)
  if (response.status === 200) {
    const itemDto = response.data
    const items = toItems([itemDto])
    return items[0] || null
  }
  else {
    throw new Error('Cand load item')
  }
}
