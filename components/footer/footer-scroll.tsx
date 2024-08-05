'use client'

import { ArrowUpIcon } from '@/icons'

export const FooterScroll: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className='group footer-button'
      aria-label='volver al comienzo'
    >
      <ArrowUpIcon className='icon-fill' />
    </button>
  )
}
