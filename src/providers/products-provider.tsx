'use client'

import { ProductPreview } from "@/graphql/types";
import { createContext, useContext } from "react";

interface ProductsContextType {
  products: ProductPreview[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export const ProductsProvider = ({ children, products }: { children: React.ReactNode, products: ProductPreview[] }) => {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
}
