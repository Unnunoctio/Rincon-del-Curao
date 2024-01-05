/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { RecordDB } from '@/types/models'
import { Schema, model, models } from 'mongoose'

const RecordSchema = new Schema<RecordDB>({
  price: { type: Number, required: true },
  date: { type: Date, required: true }
})

export default models.Record || model<RecordDB>('Record', RecordSchema)
