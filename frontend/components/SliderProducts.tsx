'use client'

import { useEffect, useRef, useState } from 'react'
import './sliderProducts.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons'

export const SliderProducts = ({ title, children }: { title: string, children: React.ReactNode }): React.ReactNode => {
  const sliderRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timer | null>(null)

  const leftScroll = (): void => {
    if (sliderRef.current !== null) {
      const scrollWidth = sliderRef.current.scrollWidth
      const scrollLeft = sliderRef.current.scrollLeft

      if (scrollLeft === 0) {
        // If at the beginning, move to the end for infinite loop
        sliderRef.current.scrollLeft = scrollWidth
      } else {
        sliderRef.current.scrollLeft -= 250
      }
    }
  }

  const rightScroll = (): void => {
    if (sliderRef.current !== null) {
      sliderRef.current.scrollLeft += 250

      // Check if we've reached the end
      const scrollLeft = sliderRef.current.scrollLeft
      const scrollWidth = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      if (scrollLeft === scrollWidth) {
        // Move to the beginning for infinite loop
        sliderRef.current.scrollLeft = 0
      }
    }
  }

  useEffect(() => {
    setAutoScrollInterval(setInterval(rightScroll, 4000))
    return (): void => clearInterval(autoScrollInterval as NodeJS.Timer)
  }, [])

  const onClickLeft = (): void => {
    leftScroll()
    clearInterval(autoScrollInterval as NodeJS.Timer)
    setAutoScrollInterval(setInterval(rightScroll, 4000))
  }

  const onClickRight = (): void => {
    rightScroll()
    clearInterval(autoScrollInterval as NodeJS.Timer)
    setAutoScrollInterval(setInterval(rightScroll, 4000))
  }

  return (
    <div className='w-full'>
      <h3 className='text-[24px] sm:text-[28px] font-medium text-primary'>{title}</h3>
      <div className='relative px-0 sm:px-4 md:px-6 lg:px-8'>
        <div
          ref={sliderRef}
          className='slider-products flex gap-6 py-3 px-2 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory'
        >
          {children}
        </div>
        <button onClick={onClickLeft} className='group absolute bottom-1/2 -left-[24px] hidden sm:block'>
          <ChevronLeftIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
        </button>
        <button onClick={onClickRight} className='group absolute bottom-1/2 -right-[24px] hidden sm:block'>
          <ChevronRightIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
        </button>
      </div>
    </div>
  )
}
