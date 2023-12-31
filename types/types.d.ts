import { OrderByEnum } from './enums'

export interface OrderBy {
  label: string
  value: OrderByEnum
}

export interface FilterOptions {
  subCategory?: string[]
  brand?: string[]
  content?: string[]
  quantity?: string[]
  package?: string[]
}
