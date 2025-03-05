'use client'

import { useProductsFilter } from "@/providers/products-filter-provider"

export const ProductCount = () => {
  const { totalProducts } = useProductsFilter()

  return (
    <span className="text-c-old-gold">
      {totalProducts} {totalProducts === 1 ? 'producto' : 'productos'}
    </span>
  )
}
