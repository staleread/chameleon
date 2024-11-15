import type { ItemSuggestion } from '../types/model.types'
import axios from 'axios'

export async function getItemSuggestions(searchString: string): Promise<ItemSuggestion[]> {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
      params: { title: searchString },
    })
    return response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      categoryName: item.category ? item.category.name : 'Unknown category',
    }))
  }
  catch (error) {
    console.error(error)
    return []
  }
}
