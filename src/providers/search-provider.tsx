'use client'

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
}

const SearchContex = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContex)
  if (!context) {
    throw new Error('useSearch must be used within a SearchContextProvider')
  }
  return context
}

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q")?.trim() || "")

  useEffect(() => {
    setQuery(searchParams.get("q")?.trim() || "")
  }, [searchParams])

  const value = {
    query,
    setQuery
  }

  return (
    <SearchContex.Provider value={value}>
      {children}
    </SearchContex.Provider>
  )
}
