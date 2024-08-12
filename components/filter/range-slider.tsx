import { useEffect, useState } from 'react'
import Slider from 'react-slider'
import '@/styles/range-slider.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { TextFormatEnum } from '@/types/enums'

interface Props {
  label: string
  minName: string
  maxName: string
  min: number
  max: number
  step: number
  textFormat: TextFormatEnum
}

const textFormats = {
  price: (minValue: number, maxValue: number) => `$${minValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} - $${maxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
  grade: (minValue: number, maxValue: number) => `${minValue.toFixed(1)}° - ${maxValue.toFixed(1)}°`
}

export const RangeSlider: React.FC<Props> = ({ label, minName, maxName, min, max, step, textFormat }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryMin = Number(searchParams.get(minName) ?? undefined)
  const queryMax = Number(searchParams.get(maxName) ?? undefined)

  const [values, setValues] = useState([!isNaN(queryMin) ? (queryMin >= max) ? max : (queryMin >= min) ? queryMin : min : min, !isNaN(queryMax) ? (queryMax <= min) ? min : (queryMax <= max) ? queryMax : max : max])

  useEffect(() => {
    setValues([!isNaN(queryMin) ? (queryMin >= max) ? max : (queryMin >= min) ? queryMin : min : min, !isNaN(queryMax) ? (queryMax <= min) ? min : (queryMax <= max) ? queryMax : max : max])
  }, [min, max, queryMin, queryMax])

  const createURL = (newValues: number[]): string => {
    const params = new URLSearchParams(searchParams)
    if (newValues[0] > min) {
      params.set(minName, newValues[0].toString())
    } else {
      params.delete(minName)
    }
    if (newValues[1] < max) {
      params.set(maxName, newValues[1].toString())
    } else {
      params.delete(maxName)
    }
    params.set('page', '1')
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className='filter-input-container'>
      <div className='range-slider-label-container'>
        <span className='filter-input-label'>
          {label}
        </span>
        <span>
          {textFormat === TextFormatEnum.PRICE && textFormats.price(values[0], values[1])}
          {textFormat === TextFormatEnum.GRADE && textFormats.grade(values[0], values[1])}
        </span>
      </div>
      <Slider
        onChange={setValues}
        onAfterChange={() => router.push(createURL(values))}
        value={values}
        min={min}
        max={max}
        step={step}
        className='range-slider-container'
        thumbClassName='range-slider-thumb thumb'
        trackClassName='range-slider-track track'
      />
    </div>
  )
}
