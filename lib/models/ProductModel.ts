/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ProductDB } from '@/types/models'
import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema<ProductDB>({
  sku: { type: Number, required: true, unique: true },
  quantity: { type: Number, required: true },
  images: { type: Schema.Types.ObjectId, ref: 'Image' },
  drink: { type: Schema.Types.ObjectId, ref: 'Drink' },
  websites: [{ type: Schema.Types.ObjectId, ref: 'Website' }]
})

export default models.Product || model<ProductDB>('Product', ProductSchema)
