import type { ItemCategory } from '../types/model.types'
import axios from 'axios'

const DELAY = 1000
// const mockCategories: ItemCategory[] = [
//   { id: 1, name: 'Electronics' },
//   { id: 2, name: 'Books' },
//   { id: 3, name: 'Clothing' },
//   { id: 4, name: 'Garden' },
// ]

// export function getAllCategories(): Promise<ItemCategory[]> {
//   return new Promise((res, rej) => setTimeout(() => {
//     Math.random() < 0.7
//       ? res(mockCategories)
//       : rej(new Error('Server is down'))
//   }, DELAY))
// }

export function getAllCategories(): Promise<ItemCategory[]> {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
        const categories = response.data.map((category: any) => ({
          id: category.id,
          name: category.name,
          imageUrl: category.image,
        }))
        res(categories)
      }
      catch (error) {
        console.error(error)
        rej(new Error('Server is down'))
      }
    }, DELAY)
  })
}
