'use client'

import { ArrowUpIcon } from '@/icons'

export const ScrollTopButton = (): React.ReactNode => {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className='group absolute sm:static top-0 -left-10 p-2 h-fit rounded-full transition-colors hover:bg-page'
      aria-label='Scroll to top'
    >
      <ArrowUpIcon className='w-6 h-6 icon-primary transition-colors icon-group-hover' />
    </button>
  )
}