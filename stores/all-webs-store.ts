import { WebInfo } from '@/graphql/types'
import { create } from 'zustand'

interface AllWebsStore {
  allWebs: WebInfo[]
  setAllWebs: (allWebs: WebInfo[]) => void
  updateAt: Date | undefined
  inTime: () => boolean
}

const TIME_LIMIT = 1000 * 60 * 60 // 1 hour

export const useAllWebsStore = create<AllWebsStore>((set, get) => ({
  allWebs: [],
  setAllWebs: (allWebs: WebInfo[]) => set({ allWebs, updateAt: new Date() }),
  updateAt: undefined,
  inTime: () => {
    const now = new Date()
    const update = get().updateAt
    if (update === undefined) return false
    const diff = now.getTime() - update.getTime()
    return diff < TIME_LIMIT
  }
}))
