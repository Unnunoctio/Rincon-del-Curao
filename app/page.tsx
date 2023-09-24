import { Suspense } from 'react'
import { AverageList, DiscountList, SliderBox, SliderLoader } from '@/components/slider'

export default function HomePage (): JSX.Element {
  return (
    <div className='flex flex-col h-full justify-evenly'>
      <SliderBox title='Ofertas del Día'>
        <Suspense fallback={<SliderLoader />}>
          <DiscountList />
        </Suspense>
      </SliderBox>

      <SliderBox title='Mejor Valorados'>
        <Suspense fallback={<SliderLoader />}>
          <AverageList />
        </Suspense>
      </SliderBox>
    </div>
  )
}
