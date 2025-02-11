'use client'

import { getAverageProducts } from '@/graphql/requests'
import { ExclamationIcon } from '@/icons/ui/exclamation-icon'
import { useHomeStore } from '@/stores/home-store'
import { useCookies } from 'next-client-cookies'
import { useEffect, useState } from 'react'
import { Loader } from '../ui/loader'
import { ProductPreview } from '../ui/product-card'
import { SliderActions } from './slider-actions'

export const AverageList: React.FC = () => {
  const prefersWebsCookie = useCookies().get('prefers-webs')
  const prefersWebsId = (prefersWebsCookie === undefined) ? [] : prefersWebsCookie.split(',')

  const { averageHashReload, setAverageHashReload, averageProducts, setAverageProducts, inTimeAverage } = useHomeStore((state) => state)
  const [isLoading, setIsLoading] = useState(!inTimeAverage() || averageHashReload !== prefersWebsCookie || averageHashReload === undefined)

  useEffect(() => {
    if (!inTimeAverage() || averageHashReload !== prefersWebsCookie || averageHashReload === undefined) {
      setIsLoading(true)
      void fetchAverageProducts()
    }
  }, [prefersWebsCookie])

  const fetchAverageProducts = async (): Promise<void> => {
    try {
      const data = await getAverageProducts(prefersWebsId)
      setAverageProducts(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setAverageHashReload(prefersWebsCookie ?? '')
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='slider-loading-container'>
        <Loader />
      </div>
    )
  }

  if (averageProducts.length === 0) {
    return (
      <div className='slider-error-container'>
        <ExclamationIcon className='slider-error-icon' />
        <span className='slider-error-text'>Productos sin valoración</span>
      </div>
    )
  }

  return (
    <SliderActions itemsLength={averageProducts.length}>
      {averageProducts.map((product, index) => (
        <li key={index} className='slider-card'>
          <ProductPreview {...product} />
        </li>
      ))}
    </SliderActions>
  )
}
