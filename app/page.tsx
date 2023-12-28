import { AverageList, DiscountList, SliderBox } from '@/components/slider'
import { Suspense } from 'react'

export default function Home (): JSX.Element {
  return (
    <div className='flex flex-col h-full justify-evenly'>
      <SliderBox title='Ofertas del Día'>
        <Suspense fallback={<div>cargando...</div>}>
          <DiscountList />
        </Suspense>
      </SliderBox>

      <SliderBox title='Mejor Valorados'>
        <Suspense fallback={<div>cargando...</div>}>
          <AverageList />
        </Suspense>
      </SliderBox>
    </div>
  )
}
