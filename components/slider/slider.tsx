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
      <div ref={ref} className='slider slider-container'>
        {children}
      </div>
      <button
        onClick={leftScroll}
        className={`${leftBtn ? 'sm:block' : 'sm:hidden'} group slider-left-button`}
        aria-label='producto anterior'
      >
        <LeftIcon className='slider-button-icon' />
      </button>
      <button
        onClick={rightScroll}
        className={`${rightBtn ? 'sm:block' : 'sm:hidden'} group slider-right-button`}
        aria-label='producto siguiente'
      >
        <RightIcon className='slider-button-icon' />
      </button>
    </>
  )
}
