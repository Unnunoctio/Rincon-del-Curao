import { ProductsDiscountList } from '@/components'
import { SliderProducts } from '@/components/SliderProducts'

export default function HomePage (): React.ReactNode {
  return (
    <div className='flex flex-col h-full justify-evenly'>
      <SliderProducts title='Ofertas del Día'>
        <ProductsDiscountList />
      </SliderProducts>
    </div>
  )
}
