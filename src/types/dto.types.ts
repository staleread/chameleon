export interface CategoryDto {
  id: number
  name: string
  image: string
}

export interface ItemDto {
  id: number
  title: string
  price: number
  description: string
  category: CategoryDto
  images: string[]
}
