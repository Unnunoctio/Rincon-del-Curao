'use client'

import { WebInfo } from '@/graphql/types'
import { createContext, useContext } from 'react'

interface WebsContextType {
  webs: WebInfo[]
}

const WebsContext = createContext<WebsContextType | undefined>(undefined)

export const useWebs = () => {
  const context = useContext(WebsContext)
  if (!context) {
    throw new Error('useWebs must be used within a WebsProvider')
  }
  return context
}

export const WebsProvider = ({ children, webs }: { children: React.ReactNode, webs: WebInfo[] }) => {
  return (
    <WebsContext.Provider value={{ webs }}>
      {children}
    </WebsContext.Provider>
  )
}
