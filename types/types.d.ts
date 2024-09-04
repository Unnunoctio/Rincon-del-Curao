import { OrderByEnum } from './enums'

export interface SearchParams {
  [key: string]: string | string[]
}

export interface OrderBy {
  label: string
  value: OrderByEnum
}

export interface Filter {
  search?: string
  category?: string
  subCategory?: string[]
  brand?: string[]
  volume?: string[]
  quantity?: string[]
  packaging?: string[]
  priceMin?: number
  priceMax?: number
  abvMin?: number
  abvMax?: number
}

export interface FormInput {
  name: string
  email: string
  subject: string
  message: string
}
