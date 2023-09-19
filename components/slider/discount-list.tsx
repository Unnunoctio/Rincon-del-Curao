import { getDiscountProducts } from '@/lib/api/get-discount-products'
import { Slider } from './slider'
import { SliderCard } from './slider-card'
import { DiscountTag } from '../discount/discount-tag'

export const DiscountList = async (): Promise<JSX.Element> => {
  const products = await getDiscountProducts()

  return (
    <Slider>
      <>
        {products.map((product, index) => (
          <SliderCard key={index} {...product}>
            <DiscountTag discount={product.discount} />
          </SliderCard>
        ))}
      </>
    </Slider>
  )
}
