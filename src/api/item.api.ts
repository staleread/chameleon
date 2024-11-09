import type { ItemSuggestion } from '../types/model.types'

const DELAY = 1000
const mockSuggestions: ItemSuggestion[] = [
  {
    id: 1,
    title: 'Product 1',
    categoryName: 'Electronics',
  },
  {
    id: 2,
    title: 'Product 2',
    categoryName: 'Books',
  },
  {
    id: 4,
    title: 'Product 24',
    categoryName: 'Books',
  },
  {
    id: 5,
    title: 'Product 34',
    categoryName: 'Books',
  },
  {
    id: 6,
    title: 'Product 55',
    categoryName: 'Books',
  },
]

export function getItemSuggestions(searchString: string): Promise<ItemSuggestion[]> {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      res(mockSuggestions.filter(item =>
        item.title.toLowerCase().includes(searchString.toLowerCase()),
      ))
    }, DELAY)
  })
}
