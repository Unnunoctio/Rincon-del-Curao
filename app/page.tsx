import { AverageList, DiscountList, SliderBox, SliderLoader } from '@/components/slider'
import { generateWebsHash } from '@/helpers/hash'
import { Suspense } from 'react'

export default function Home (): JSX.Element {
  const hash = generateWebsHash()

  return (
    <div className='sliders-container'>
      <SliderBox title='Ofertas del Día'>
        <Suspense key={hash} fallback={<SliderLoader />}>
          <DiscountList />
        </Suspense>
      </SliderBox>

      <SliderBox title='Mejor Valorados'>
        <Suspense key={hash} fallback={<SliderLoader />}>
          <AverageList />
        </Suspense>
      </SliderBox>
    </div>
  )
}
