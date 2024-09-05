import { Slider } from './slider'
import { SliderNotFound } from './slider-not-found'
import { PreviewCard } from '../preview-card'
import { getAverageProducts } from '@/lib/api/home'

export const AverageList = async (): Promise<JSX.Element> => {
  const products = await getAverageProducts()

  if (products.length === 0) return <SliderNotFound text='Productos sin valoración' />

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} className='slider-preview-card' />
      ))}
    </Slider>
  )
}
