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
      className='group absolute sm:static top-0 -right-0 p-2 h-fit rounded-full transition-colors hover:bg-page'
      aria-label='volver al comienzo'
    >
      <ArrowUpIcon className='w-6 h-6 icon-primary transition-colors icon-group-hover' />
    </button>
  )
}
