import { ProductsAverageList, ProductsDiscountList, SliderProducts } from '@/components/slider'

export default function HomePage (): React.ReactNode {
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
