import { Document, Types } from 'mongoose'

export interface Drink {
  _id: Types.ObjectId
  name: string
  brand: string
  alcoholic_grade: number
  content: number
  package: string
  category: string
  sub_category: string
  made_in?: string
  variety?: string
  bitterness?: string
  strain?: string
  vineyard?: string
}

export type ProductUnit = Omit<Drink, '_id'>

interface Website {
  name: string
  logo: string
  url: string
  price: number
  best_price: number
  average: number
  watch: number
}

export interface Product extends Document {
  title: string
  quantity: number
  image_url: string
  product: Drink
  websites: Types.DocumentArray<Website>
}

export interface Filter {
  category: string
  sub_category?: string[]
  brand?: string[]
  content?: number[]
  quantity?: number[]
  package?: string[]
}

interface DynamicObject { [key: string]: number }

export interface MultiDynamicObject {
  [key: string]: DynamicObject
}

export interface FilterOutput {
  sub_category: MultiDynamicObject
  brand: MultiDynamicObject
  content: MultiDynamicObject
  quantity: MultiDynamicObject
  package: MultiDynamicObject
}
