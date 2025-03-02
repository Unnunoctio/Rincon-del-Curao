'use client'

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

interface CookiesContextType {
  selectedWebs: string[];
  setSelectedWebs: (selectedWebs: string[]) => void;
}

const CookiesContext = createContext<CookiesContextType | undefined>(undefined)

export const useCookies = () => {
  const context = useContext(CookiesContext)
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookiesProvider')
  }
  return context
}

export const CookiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedWebs, setSelectedWebs] = useState<string[]>([])

  useEffect(() => {
    const cookie = Cookies.get('selectedWebs')
    setSelectedWebs(cookie === undefined ? [] : cookie.split(','))
  }, [])

  const value = {
    selectedWebs,
    setSelectedWebs
  }

  return (
    <CookiesContext.Provider value={value}>
      {children}
    </CookiesContext.Provider>
  )
}
