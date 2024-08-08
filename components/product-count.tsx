'use client'

import { SearchParams } from '@/types/types'
import { useEffect, useState } from 'react'

interface Props {
  category: string
  searchParams: SearchParams
  hash: string
}

export const ProductCount: React.FC<Props> = ({ category, searchParams, hash }) => {
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTotalProducts = async (): Promise<void> => {
      setIsLoading(true)
      const response = await fetch(`/api/total-products?category=${category}&options=${JSON.stringify(searchParams)}`)
      const data = await response.json()
      setTotalProducts(data)
      setIsLoading(false)
    }
    void fetchTotalProducts()
  }, [hash])

  if (isLoading) return <span className='product-list-count'>Cargando...</span>

  return (
    <span className='product-list-count'>{totalProducts} {totalProducts !== 1 ? 'productos' : 'producto'}</span>
  )
}
