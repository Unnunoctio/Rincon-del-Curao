import { OrderByEnum } from './enum'

// Product
export interface ProductSlider {
  path: string
  title: string
  brand: string
  category: string
  bestPrice: number
  imageUrl: string
}

export interface DiscountProduct extends ProductSlider {
  discount: number
}

export interface AverageProduct extends ProductSlider {
  average: number
}

interface ProductUnit {
  name: string
  brand: string
  alcoholicGrade: number
  content: number
  package: string
  category: string
  subcategory: string
  madeIn?: string
  variety?: string
  bitterness?: string
  strain?: string
  vineyard: string
}

export interface Website {
  name: string
  logo: string
  url: string
  price: number
  bestPrice: number
  average: number
}

export interface Product {
  title: string
  quantity: number
  imageUrl: string
  product: ProductUnit
  websites: Website[]
}

// Order by
export interface OrderByItem {
  label: string
  value: OrderByEnum
}

// Filter
export interface Filter {
  category: string
  sub_category?: string[]
  brand?: string[]
  content?: number[]
  quantity?: number[]
  package?: string[]
}

export interface ObjectFilter {
  label: string
  value: string | number
}

export interface FilterOptions {
  subCategory: ObjectFilter[]
  brand: ObjectFilter[]
  content: ObjectFilter[]
  quantity: ObjectFilter[]
  package: ObjectFilter[]
}
