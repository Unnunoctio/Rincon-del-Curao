import { ProductPreview } from '@/graphql/types'
import { create } from 'zustand'

interface HomeStore {
  discountHashReload: string | undefined
  setDiscountHashReload: (hashReload: string) => void

  discountProducts: ProductPreview[]
  setDiscountProducts: (discountProducts: ProductPreview[]) => void
  discountUpdateAt: Date | undefined
  inTimeDiscount: () => boolean

  averageHashReload: string | undefined
  setAverageHashReload: (hashReload: string) => void

  averageProducts: ProductPreview[]
  setAverageProducts: (averageProducts: ProductPreview[]) => void
  averageUpdateAt: Date | undefined
  inTimeAverage: () => boolean
}

const TIME_LIMIT = 1000 * 60 * 60 // 1 hour

export const useHomeStore = create<HomeStore>((set, get) => ({
  // DISCOUNT
  discountHashReload: undefined,
  setDiscountHashReload: (discountHashReload: string) => set({ discountHashReload }),

  discountProducts: [],
  setDiscountProducts: (discountProducts: ProductPreview[]) => set({ discountProducts, discountUpdateAt: new Date() }),
  discountUpdateAt: undefined,
  inTimeDiscount: () => {
    const now = new Date()
    const update = get().discountUpdateAt
    if (update === undefined) return false
    const diff = now.getTime() - update.getTime()
    return diff < TIME_LIMIT
  },
  // AVERAGE
  averageHashReload: undefined,
  setAverageHashReload: (averageHashReload: string) => set({ averageHashReload }),

  averageProducts: [],
  setAverageProducts: (averageProducts: ProductPreview[]) => set({ averageProducts, averageUpdateAt: new Date() }),
  averageUpdateAt: undefined,
  inTimeAverage: () => {
    const now = new Date()
    const update = get().averageUpdateAt
    if (update === undefined) return false
    const diff = now.getTime() - update.getTime()
    return diff < TIME_LIMIT
  }
}))
