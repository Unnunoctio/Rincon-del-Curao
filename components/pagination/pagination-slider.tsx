'use client'

import '@/styles/slider.css'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

interface Props {
  totalPages: number
  children: React.ReactNode
}

export const PaginationSlider: React.FC<Props> = ({ totalPages, children }) => {
  const sliderRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)

  const leftScroll = (): void => {
    if (sliderRef.current !== null) {
      const sliderWidth = sliderRef.current.clientWidth
      if (sliderWidth === 138) sliderRef.current.scrollLeft -= 150
      else if (sliderWidth === 188) sliderRef.current.scrollLeft -= 200
      else if (sliderWidth === 238) sliderRef.current.scrollLeft -= 250
    }
  }

  const rightScroll = (): void => {
    if (sliderRef.current !== null) {
      const sliderWidth = sliderRef.current.clientWidth
      if (sliderWidth === 138) sliderRef.current.scrollLeft += 150
      else if (sliderWidth === 188) sliderRef.current.scrollLeft += 200
      else if (sliderWidth === 238) sliderRef.current.scrollLeft += 250
    }
  }

  // Detectar la página actual basada en la posición del slider
  const handleScroll = (): void => {
    if (sliderRef.current !== null) {
      const sliderWidth = sliderRef.current.clientWidth
      const scrollWidth = sliderRef.current.scrollWidth
      const scrollLeft = sliderRef.current.scrollLeft
      const page = Math.floor((scrollLeft * totalPages) / scrollWidth) + 1

      setStartPage(page)
      let newEndPage = 0
      if (sliderWidth === 88) {
        newEndPage = page + 1
      } else if (sliderWidth === 138) {
        newEndPage = page + 2
      } else if (sliderWidth === 188) {
        newEndPage = page + 3
      } else if (sliderWidth === 238) {
        newEndPage = page + 4
      }

      if (newEndPage > totalPages) newEndPage = totalPages
      setEndPage(newEndPage)
    }
  }

  useEffect(() => {
    if (sliderRef.current !== null) {
      sliderRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (sliderRef.current !== null) {
        sliderRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [totalPages])

  useEffect(() => {
    if (sliderRef.current !== null) {
      sliderRef.current.scrollLeft = 0
    }
    handleScroll()
  }, [totalPages])

  return (
    <section className='relative'>
      <div ref={sliderRef} className='slider flex gap-3 max-w-[138px] xs:max-w-[188px] sm:max-w-[238px] overflow-x-auto scroll-smooth snap-x snap-mandatory touch-none'>
        {children}
      </div>
      <button
        onClick={leftScroll}
        className={`${startPage === 1 ? 'hidden' : 'flex'} group absolute top-0 -start-[50px] justify-center items-center w-[38px] h-[38px] rounded-md transition-colors hover:bg-active/75`}
        aria-label='pagination left'
      >
        <ChevronLeftIcon className='w-8 h-8 fill-transparent icon-stroke-secondary transition-colors group-hover:icon-stroke-contrast' />
      </button>
      <button
        onClick={rightScroll}
        className={`${endPage === totalPages ? 'hidden' : 'flex'} group absolute top-0 -end-[50px] justify-center items-center w-[38px] h-[38px] rounded-md transition-colors hover:bg-active/75`}
        aria-label='pagination right'
      >
        <ChevronRightIcon className='w-8 h-8 fill-transparent icon-stroke-secondary transition-colors group-hover:icon-stroke-contrast' />
      </button>
    </section>
  )
}
