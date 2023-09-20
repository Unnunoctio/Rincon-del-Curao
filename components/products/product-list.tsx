'use client'

import { getProducts } from '@/lib/api/get-products'
import { ProductList as ProductListType } from '@/types/api'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProductCard } from './product-card'
import { ProductListNotFound } from './product-list-not-found'
import { ProductListLoader } from './product-list-loader'

export const ProductList: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductListType[]>([])

  const { category } = useParams()
  const searchParams = useSearchParams()

  const fetchData = async (): Promise<void> => {
    setLoading(true)
    setProducts(await getProducts(category as string, searchParams))
    setLoading(false)
  }

  useEffect(() => {
    void fetchData()
  }, [searchParams])

  if (loading) return <ProductListLoader />
  if (products.length === 0) return <ProductListNotFound />

  return (
    <div className='grid grid-cols-product-list justify-items-center gap-4 min-h-product-list'>
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  )
}
