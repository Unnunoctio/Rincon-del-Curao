import { getCookie } from '@/lib/cookies'
import { getDiscountProducts } from '@/lib/api'
import { PreviewCard } from '../card/preview-card'
import { Slider } from './slider'

export const DiscountList = async (): Promise<JSX.Element> => {
  const prefWebs = getCookie('prefWebs')
  const products = await getDiscountProducts((prefWebs === null) ? [] : prefWebs.split(','))

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} className='snap-center sm:snap-start snap-always' />
      ))}
    </Slider>
  )
}
