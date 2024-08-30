'use client'

import { Slider } from './slider'
import { SliderNotFound } from './slider-not-found'
import { PreviewCard } from '../preview-card'
import { useEffect, useState } from 'react'
import { ProductPreview } from '@/types/api'
import { SliderLoader } from './slider-loader'

export const DiscountList: React.FC = () => {
  const [products, setProducts] = useState<ProductPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      setIsLoading(true)
      const response = await fetch('/api/discount-products')
      const data = await response.json()
      setProducts(data)
      setIsLoading(false)
    }
    void fetchProducts()
  }, [])

  if (isLoading) return <SliderLoader />
  if (products.length === 0) return <SliderNotFound text='Productos sin oferta' />

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} className='slider-preview-card' />
      ))}
    </Slider>
  )
}
