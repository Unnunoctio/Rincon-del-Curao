import { getCookie } from '@/lib/cookies'
import { getDiscountProducts } from '@/lib/api'
import { PreviewCard } from '../card/preview-card'
import { Slider } from './slider'
import { SliderNotFound } from './slider-not-found'

export const DiscountList = async (): Promise<JSX.Element> => {
  const prefWebs = getCookie('prefWebs')
  const products = await getDiscountProducts((prefWebs === null) ? [] : prefWebs.split(','))

  if (products.length === 0) {
    return <SliderNotFound text='Productos sin oferta' />
  }

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} className='snap-center sm:snap-start snap-always' />
      ))}
    </Slider>
  )
}
