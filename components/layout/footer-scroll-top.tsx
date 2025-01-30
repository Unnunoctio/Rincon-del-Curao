'use client'

import { ArrowUpIcon } from '@/icons/layout/arrow-up-icon'
import { JSX } from 'react'

export const FooterScrollTop = (): JSX.Element => {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className='group f-scroll-top-button'
      aria-label='Ir al inicio'
    >
      <ArrowUpIcon className='icon' />
    </button>
  )
}
