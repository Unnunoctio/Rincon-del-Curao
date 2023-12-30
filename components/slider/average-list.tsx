import { getCookie } from '@/lib/cookies'
import { getAverageProducts } from '@/lib/api'
import { PreviewCard } from '../card/preview-card'
import { Slider } from './slider'
import { SliderNotFound } from './slider-not-found'

export const AverageList = async (): Promise<JSX.Element> => {
  const prefWebs = getCookie('prefWebs')
  const products = await getAverageProducts((prefWebs === null) ? [] : prefWebs.split(','))

  if (products.length === 0) {
    return <SliderNotFound text='Productos sin valoración' />
  }

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} className='snap-center sm:snap-start snap-always' />
      ))}
    </Slider>
  )
}
