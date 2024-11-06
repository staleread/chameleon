import type { Item } from '../types/model.types'

const items: Item[] = [
  {
    id: 1,
    isWished: false,
    title: 'Product 1',
    price: 29.99,
    categoryName: 'Electronics',
    imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
  },
  {
    id: 2,
    isWished: false,
    title: 'Product 2',
    price: 59.99,
    categoryName: 'Books',
    imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
  },
  {
    id: 3,
    isWished: true,
    title: 'Product 3',
    price: 19.99,
    categoryName: 'Home',
    imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
  },
  {
    id: 4,
    isWished: true,
    title: 'Product 4',
    price: 19.99,
    categoryName: 'Home',
    imageUrl: 'https://mobilis-outsourcing.com.ua/wp-content/uploads/2020/05/%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D0%BE%D0%B2%D0%B0%D1%80-%D0%B8%D0%B7-%D0%9A%D0%B8%D1%82%D0%B0%D1%8F.jpg',
  },
]

export function getAllItems(): Item[] {
  return items
}
