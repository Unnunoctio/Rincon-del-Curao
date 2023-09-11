import { ProductsAverageList, ProductsDiscountList, SliderProducts } from '@/components/slider'
import { Suspense } from 'react'

export default function HomePage (): React.ReactNode {
  return (
    <div className='flex flex-col h-full justify-evenly'>
      <SliderProducts title='Ofertas del Día'>
        <Suspense fallback={<p className='inline-block'>Cargando ...</p>}>
          <ProductsDiscountList />
        </Suspense>
      </SliderProducts>
      <SliderProducts title='Mejor Valorados'>
        <Suspense fallback={<p className='inline-block'>Cargando ...</p>}>
          <ProductsAverageList />
        </Suspense>
      </SliderProducts>
    </div>
  )
}
