import { Document } from 'mongoose'

export interface InfoDB extends Document {
  name: string
  url: string
  logo: string
}
