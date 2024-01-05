/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ImageDB } from '@/types/models'
import { Schema, model, models } from 'mongoose'

const ImageSchema = new Schema<ImageDB>({
  small: { type: String, required: true },
  large: { type: String, required: true }
})

export default models.Image || model<ImageDB>('Image', ImageSchema)
