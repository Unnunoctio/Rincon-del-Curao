import { AverageList, DiscountList, SliderBox } from '@/components/slider'
import { generateWebsHash } from '@/helpers/hash'

export default function Home (): JSX.Element {
  const hash = generateWebsHash()
  return (
    <div className='sliders-container'>
      <SliderBox title='Ofertas del Día'>
        <DiscountList hash={hash} />
      </SliderBox>

      <SliderBox title='Mejor Valorados'>
        <AverageList hash={hash} />
      </SliderBox>
    </div>
  )
}
