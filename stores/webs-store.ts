import { Web } from '@/types/api'
import { create } from 'zustand'

interface WebsState {
  updateAt: Date | undefined
  allWebs: Web[]
  setWebs: (webs: Web[]) => void
  inTime: () => boolean
}

const TIME_LIMIT = 1000 * 60 * 60 // 1 hour

export const useWebsStore = create<WebsState>()((set, get) => ({
  updateAt: undefined,
  allWebs: [],
  setWebs: (webs: Web[]) => set({ allWebs: webs, updateAt: new Date() }),
  inTime: () => {
    const now = new Date()
    const update = get().updateAt
    if (update === undefined) return false
    const diff = now.getTime() - update.getTime()
    return diff < TIME_LIMIT
  }
}))
