import { AverageList } from '@/components/home/average-list'
import { DiscountList } from '@/components/home/discount-list'
import { Slider } from '@/components/home/slider'
import { JSX } from 'react'
import '@/styles/globals.css'

export default function Home (): JSX.Element {
  return (
    <div className='home-page'>
      <Slider title='Ofertas del Día'>
        <DiscountList />
      </Slider>
      <Slider title='Mejor Valorados'>
        <AverageList />
      </Slider>
    </div>
  )
}
