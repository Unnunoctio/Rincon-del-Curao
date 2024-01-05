/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { InfoDB } from '@/types/models'
import { Schema, model, models } from 'mongoose'

const InfoSchema = new Schema<InfoDB>({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  logo: { type: String, required: true, unique: true }
})

export default models.Info || model<InfoDB>('Info', InfoSchema)
