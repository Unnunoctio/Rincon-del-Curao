'use client'

import { getDiscountProducts } from '@/graphql/requests'
import { useHomeStore } from '@/stores/home-store'
import { useCookies } from 'next-client-cookies'
import { useEffect, useState } from 'react'
import { ProductPreview } from '../ui/product-card'
import { SliderActions } from './slider-actions'
import { Loader } from '../ui/loader'
import { ExclamationIcon } from '@/icons/ui/exclamation-icon'

export const DiscountList: React.FC = () => {
  const prefersWebsCookie = useCookies().get('prefers-webs')
  const prefersWebsId = (prefersWebsCookie === undefined) ? [] : prefersWebsCookie.split(',')

  const { discountHashReload, setDiscountHashReload, discountProducts, setDiscountProducts, inTimeDiscount } = useHomeStore((state) => state)
  const [isLoading, setIsLoading] = useState(!inTimeDiscount() || discountHashReload !== prefersWebsCookie || discountHashReload === undefined)

  useEffect(() => {
    if (!inTimeDiscount() || discountHashReload !== prefersWebsCookie || discountHashReload === undefined) {
      setIsLoading(true)
      void fetchDiscountProducts()
    }
  }, [prefersWebsCookie])

  const fetchDiscountProducts = async (): Promise<void> => {
    try {
      const data = await getDiscountProducts(prefersWebsId)
      setDiscountProducts(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setDiscountHashReload(prefersWebsCookie ?? '')
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

  if (discountProducts.length === 0) {
    return (
      <div className='slider-error-container'>
        <ExclamationIcon className='slider-error-icon' />
        <span className='slider-error-text'>Productos sin oferta</span>
      </div>
    )
  }

  return (
    <SliderActions itemsLength={discountProducts.length}>
      {discountProducts.map((product, index) => (
        <li key={index} className='slider-card'>
          <ProductPreview {...product} />
        </li>
      ))}
    </SliderActions>
  )
}
