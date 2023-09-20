'use client'

import '@/styles/slider.css'
import { useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

interface Props {
  children: JSX.Element
}

export const Slider: React.FC<Props> = ({ children }): JSX.Element => {
  const sliderRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  const leftScroll = (): void => {
    if (sliderRef.current !== null) {
      const scrollWidth = sliderRef.current.scrollWidth
      const scrollLeft = sliderRef.current.scrollLeft

      if (scrollLeft === 0) {
        sliderRef.current.scrollLeft = scrollWidth
      } else {
        sliderRef.current.scrollLeft -= 250
      }
    }
  }

  const rightScroll = (): void => {
    if (sliderRef.current !== null) {
      sliderRef.current.scrollLeft += 250

      const scrollLeft = sliderRef.current.scrollLeft
      const scrollWidth = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      if (scrollLeft === scrollWidth) {
        sliderRef.current.scrollLeft = 0
      }
    }
  }

  return (
    <>
      <div ref={sliderRef} className='slider flex gap-8 py-3 px-2 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory'>
        {children}
      </div>
      <button
        onClick={leftScroll}
        className='group absolute bottom-1/2 -left-[24px] hidden sm:block'
        aria-label='scroll left'
      >
        <ChevronLeftIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
      </button>
      <button
        onClick={rightScroll}
        className='group absolute bottom-1/2 -right-[24px] hidden sm:block'
        aria-label='scroll right'
      >
        <ChevronRightIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
      </button>
    </>
  )
}
