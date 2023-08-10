import { Document, Types } from 'mongoose'

interface ProductUnit {
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

interface Website {
  name: string
  url: string
  price: number
  best_price: number
  average: number
}

export interface Product extends Document {
  title: string
  quantity: number
  image_path: string
  product: ProductUnit
  websites: Types.DocumentArray<Website>
}
