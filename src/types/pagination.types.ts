export interface Paginated<T> {
  pageNumber: number
  hasNext: boolean
  items: T[]
}
