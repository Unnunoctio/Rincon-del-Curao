'use client'

import { LeftIcon, RightIcon } from '@/icons'
import '@/styles/slider.css'
import { useRef, useState } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const Slider: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [leftBtn, setLeftBtn] = useState(false)
  const [rightBtn, setRightBtn] = useState(true)

  const leftScroll = (): void => {
    if (ref.current !== null) {
      ref.current.scrollLeft -= 250
      setRightBtn(true)

      const left = ref.current.scrollLeft
      if (left < 300) {
        setLeftBtn(false)
      }
    }
  }

  const rightScroll = (): void => {
    if (ref.current !== null) {
      ref.current.scrollLeft += 250
      setLeftBtn(true)

      const left = ref.current.scrollLeft
      const width = ref.current.scrollWidth - ref.current.clientWidth - 280
      if (left >= width) {
        setRightBtn(false)
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
        className={`${leftBtn ? 'sm:block' : 'sm:hidden'} group absolute bottom-1/2 -left-[24px] hidden`}
        aria-label='scroll left'
      >
        <LeftIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
      </button>
      <button
        onClick={rightScroll}
        className={`${rightBtn ? 'sm:block' : 'sm:hidden'} group absolute bottom-1/2 -right-[24px] hidden`}
        aria-label='scroll right'
      >
        <RightIcon className='w-10 h-10 fill-transparent icon-stroke-secondary icon-group-stroke-hover transition-colors' />
      </button>
    </>
  )
}
