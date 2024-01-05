/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { WebsiteDB } from '@/types/models'
import { Schema, model, models } from 'mongoose'

const WebsiteSchema = new Schema<WebsiteDB>({
  info: { type: Schema.Types.ObjectId, ref: 'Info' },
  path: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  best_price: { type: Number, required: true },
  average: { type: Number },
  last_update: { type: Number, required: true },
  in_stock: { type: Boolean, required: true },
  records: [{ type: Schema.Types.ObjectId, ref: 'Record' }]
})

export default models.Website || model<WebsiteDB>('Website', WebsiteSchema)
