'use client'

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
    <div className='relative'>
      <div className='flex justify-between items-baseline'>
        <span className='text-primary text-[18px] font-medium'>
          {label}
        </span>
        <span className='text-primary'>
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
        className='flex items-center w-full h-4 mt-3 mb-2 cursor-pointer'
        thumbClassName='w-[14px] h-[14px] bg-active rounded-full transition active:ring-[10px] focus:ring-[6px] focus:ring-active/30 focus:ring-offset-0 thumb'
        trackClassName='h-[3px] bg-active/30 rounded track'
      />
    </div>
  )
}
