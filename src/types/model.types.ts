export interface ItemBase {
  id: number
  title: string
  price: number
  categoryName: string
  imageUrl: string
}

export interface Item extends ItemBase {
  isWished: boolean
}

export interface CartItem extends ItemBase {
  amount: number
}

export interface ItemFilterOptions {
  minPrice: number
  maxPrice: number
  categoryId?: number
}

export interface ItemCategory {
  id: number
  name: string
}

export interface ItemSuggestion {
  id: number
  title: string
  categoryName: string
}

export interface CartEntry {
  itemId: number
  amount: number
}

export interface WishListEntry {
  itemId: number
}

export interface CartInfo {
  total: number
  items: CartItem[]
}
