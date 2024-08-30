import { AverageList, DiscountList, SliderBox } from '@/components/slider'

export default function Home (): JSX.Element {
  return (
    <div className='sliders-container'>
      <SliderBox title='Ofertas del Día'>
        <DiscountList />
      </SliderBox>

      <SliderBox title='Mejor Valorados'>
        <AverageList />
      </SliderBox>
    </div>
  )
}
