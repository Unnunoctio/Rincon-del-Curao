import { FilterOptions } from '@/types/api'
import { create } from 'zustand'

interface ProductsPropsState {
  lastHash: string
  updateAt: Date | undefined
  totalCount: number | undefined
  totalPages: number | undefined
  filterOptions: FilterOptions | undefined

  setData: (totalCount: number, totalPages: number, filterOptions: FilterOptions) => void
  setLastHash: (hash: string) => void
  sameHash: (hash: string) => boolean
}

const TIME_LIMIT = 1000 * 60 * 60

export const useProductsPropsStore = create<ProductsPropsState>()((set, get) => ({
  lastHash: '',
  updateAt: undefined,
  totalCount: undefined,
  totalPages: undefined,
  filterOptions: undefined,

  setData: (totalCount: number, totalPages: number, filterOptions: FilterOptions) => set({
    totalCount,
    totalPages,
    filterOptions
  }),
  setLastHash: (hash: string) => set({ lastHash: hash, updateAt: new Date() }),
  sameHash: (hash: string) => {
    const now = new Date()
    const update = get().updateAt
    if (update === undefined) return false

    const diff = now.getTime() - update.getTime()
    return get().lastHash === hash && diff < TIME_LIMIT
  }
}))
