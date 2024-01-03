import { OrderByEnum } from './enums'

export interface OrderBy {
  label: string
  value: OrderByEnum
}

export interface FilterOptions {
  brand?: string[]
}
