import { AverageList, DiscountList, SliderBox } from '@/components/slider'
import { Suspense } from 'react'

export default function Home (): JSX.Element {
  return (
    <div className='flex flex-col gap-10 h-full justify-between pt-10'>
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
