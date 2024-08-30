import { Slider } from './slider'
import { SliderNotFound } from './slider-not-found'
import { PreviewCard } from '../preview-card'
import { getDiscountProducts } from '@/lib/api/home/get-discount-products'

export const DiscountList = async (): Promise<JSX.Element> => {
  const products = await getDiscountProducts()

  if (products.length === 0) return <SliderNotFound text='Productos sin oferta' />

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} className='slider-preview-card' />
      ))}
    </Slider>
  )
}
