import { OrderByEnum } from './enums'

export interface OrderBy {
  label: string
  value: OrderByEnum
}

export interface FilterOptions {
  search?: string
  subCategory?: string[]
  brand?: string[]
  content?: string[]
  quantity?: string[]
  package?: string[]
  priceMin?: number
  priceMax?: number
  gradeMin?: number
  gradeMax?: number
}

export interface FormInput {
  name: string
  email: string
  subject: string
  message: string
}
