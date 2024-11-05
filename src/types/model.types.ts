export interface ItemFilterOptions {
  minPrice: number
  maxPrice: number
  categoryId?: number
}

export interface ItemCategory {
  id: number
  name: string
}
