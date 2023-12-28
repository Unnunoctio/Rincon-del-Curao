'use client'

import { LeftIcon, RightIcon } from '@/icons'
import '@/styles/slider.css'
import { useRef } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const Slider: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const leftScroll = (): void => {
    if (ref.current !== null) {
      const width = ref.current.scrollWidth
      const left = ref.current.scrollLeft

      if (left === 0) {
        ref.current.scrollLeft = width
      } else {
        ref.current.scrollLeft -= 250
      }
    }
  }

  const rightScroll = (): void => {
    if (ref.current !== null) {
      ref.current.scrollLeft += 250

      const left = ref.current.scrollLeft
      const width = ref.current.scrollWidth - ref.current.clientWidth
      if (left === width) {
        ref.current.scrollLeft = 0
      }
    }
  }

  return (
    <>
      <div ref={ref} className='slider flex gap-8 py-3 px-2 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory'>
        {children}
      </div>
      <button
        onClick={leftScroll}
        className='group absolute bottom-1/2 -left-[24px] hidden sm:block'
        aria-label='scroll left'
      >
        <LeftIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
      </button>
      <button
        onClick={rightScroll}
        className='group absolute bottom-1/2 -right-[24px] hidden sm:block'
        aria-label='scroll right'
      >
        <RightIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
      </button>
    </>
  )
}
