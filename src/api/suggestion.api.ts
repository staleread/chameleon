import type { ItemDto } from '@/types/dto.types'
import type { ItemSuggestion } from '@/types/model.types'
import config from '@/config'
import axios from 'axios'

export async function getItemSuggestions(searchString: string): Promise<ItemSuggestion[]> {
  const response = await axios.get(`${config.api.baseUrl}/products`, {
    params: { title: searchString },
  })

  const data: ItemDto[] = response.data

  const suggestions: ItemSuggestion[] = data.map((dto: ItemDto) => ({
    id: dto.id,
    title: dto.title,
    categoryName: dto.category.name,
  }))

  return suggestions
}
