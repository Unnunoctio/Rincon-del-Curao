import { Document } from 'mongoose'

export interface DrinkDB extends Document {
  name: string
  brand: string
  alcoholic_grade: number
  content: number
  package: string
  category: string
  sub_category: string
  made_in: string
  variety?: string
  bitterness?: number
  temperature?: string
  strain?: string
  vineyard?: string
}

export interface ImageDB extends Document {
  small: string
  large: string
}

export interface InfoDB extends Document {
  name: string
  url: string
  logo: string
}

export interface RecordDB extends Document {
  price: number
  date: Date
}

export interface WebsiteDB extends Document {
  info: ObjectId
  path: string
  price: number
  best_price: number
  average: number | null
  last_update: number
  in_stock: boolean
  records: ObjectId[]
}

export interface ProductDB extends Document {
  sku: number
  quantity: number
  images: ObjectId
  drink: ObjectId
  websites: ObjectId[]
}
