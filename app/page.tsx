import { AverageList, DiscountList, SliderBox, SliderLoader } from '@/components/slider'
import { getCookie } from '@/lib/cookies'
import { Suspense } from 'react'

export default function Home (): JSX.Element {
  const prefWebs = getCookie('prefWebs')

  return (
    <div className='flex flex-col gap-10 h-full justify-between pt-10'>
      <SliderBox title='Ofertas del Día'>
        <Suspense key={prefWebs} fallback={<SliderLoader />}>
          <DiscountList />
        </Suspense>
      </SliderBox>

      <SliderBox title='Mejor Valorados'>
        <Suspense key={prefWebs} fallback={<SliderLoader />}>
          <AverageList />
        </Suspense>
      </SliderBox>
    </div>
  )
}
