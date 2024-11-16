import type { CategoryDto } from '@/types/dto.types'
import type { ItemCategory } from '@/types/model.types'
import config from '@/config'
import axios from 'axios'

export async function getAllCategories(): Promise<ItemCategory[]> {
  const response = await axios.get(`${config.api.baseUrl}/categories`)

  const data: CategoryDto[] = response.data

  const categories: ItemCategory[] = data.map((dto: CategoryDto) => ({
    id: dto.id,
    name: dto.name,
    imageUrl: dto.image,
  }))

  return categories
}
