import { getAverageProducts } from '@/lib/api/get-average-products'
import { Slider } from './slider'
import { SliderCard } from './slider-card'
import { AverageTag } from '../average/average-tag'

export const AverageList = async (): Promise<JSX.Element> => {
  const products = await getAverageProducts()

  return (
    <Slider>
      <>
        {products.map((product, index) => (
          <SliderCard key={index} {...product}>
            <AverageTag average={product.average} />
          </SliderCard>
        ))}
      </>
    </Slider>
  )
}
