import { OrderByEnum } from './enum'

// Links
export type Route = `/${string}`

export interface PathLink {
  name: string
  route: Route
}

interface CategoryQuery {
  name: string
  query: string
}

export interface PathLinkAll extends PathLink {
  categories: CategoryQuery[]
}

// Order by
export interface OrderByItem {
  label: string
  value: OrderByEnum
}

// Filters
export interface Filter {
  category: string
  sub_category?: string[]
}

// Products
export interface AllProducts {
  totalProducts: number
  totalPages: number
  allProducts: Product[]
}

export interface Product {
  path: string
  title: string
  brand: string
  alcoholicGrade: number
  content: number
  bestPrice: number
  imageUrl: string
}
