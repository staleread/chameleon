import type { ItemCategory } from '../types/model.types'

const DELAY = 1000
const mockCategories: ItemCategory[] = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Books' },
  { id: 3, name: 'Clothing' },
  { id: 4, name: 'Garden' },
]

export function getAllCategories(): Promise<ItemCategory[]> {
  // return mock categories after a delay
  return new Promise(res => setTimeout(() => res(mockCategories), DELAY))
}
