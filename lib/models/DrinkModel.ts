/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { DrinkDB } from '@/types/models'
import { Schema, model, models } from 'mongoose'

const DrinkSchema = new Schema<DrinkDB>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  alcoholic_grade: { type: Number, required: true },
  content: { type: Number, required: true },
  package: { type: String, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  made_in: { type: String, required: true },
  variety: { type: String },
  bitterness: { type: Number },
  temperature: { type: String },
  strain: { type: String },
  vineyard: { type: String }
})

export default models.Drink || model<DrinkDB>('Drink', DrinkSchema)
