'use client'

import { useProducts } from "@/providers/products-provider"

export const ProductCount = () => {
  const { totalProducts } = useProducts()

  return (
    <span className="text-c-old-gold">
      {totalProducts} {totalProducts === 1 ? 'producto' : 'productos'}
    </span>
  )
}
