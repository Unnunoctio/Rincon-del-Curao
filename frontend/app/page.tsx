import { ProductsAverageList, ProductsDiscountList, SliderProducts } from '@/components/slider'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function HomePage () {
  return (
    <div className='flex flex-col h-full justify-evenly'>
      <SliderProducts title='Ofertas del Día'>
        <ProductsDiscountList />
      </SliderProducts>
      <SliderProducts title='Mejor valorados'>
        <ProductsAverageList />
      </SliderProducts>
    </div>
  )
}
