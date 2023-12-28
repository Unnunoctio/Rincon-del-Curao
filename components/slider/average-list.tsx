import { getAverageProducts } from '@/lib/api'
import { PreviewCard } from '../card/preview-card'
import { Slider } from './slider'

export const AverageList = async (): Promise<JSX.Element> => {
  const products = await getAverageProducts()

  return (
    <Slider>
      {products.map((product, index) => (
        <PreviewCard key={index} {...product} />
      ))}
    </Slider>
  )
}
