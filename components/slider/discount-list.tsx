import { getDiscountProducts } from '@/lib/api/get-discount-products'
import { SliderNotFound } from './slider-not-found'
import { Slider } from './slider'
import { PreviewCard } from '../preview-card'

export const DiscountList = async (): Promise<JSX.Element> => {
  const products = await getDiscountProducts()

  if (products.length === 0) {
    return <SliderNotFound text='Productos sin oferta' />
  }

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} className='slider-preview-card' />
      ))}
    </Slider>
  )
}
