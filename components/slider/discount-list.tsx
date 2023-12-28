import { getDiscountProducts } from '@/lib/api'
import { PreviewCard } from '../card/preview-card'
import { Slider } from './slider'

export const DiscountList = async (): Promise<JSX.Element> => {
  const products = await getDiscountProducts()

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} />
      ))}
    </Slider>
  )
}
