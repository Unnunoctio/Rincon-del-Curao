'use client'

import { FilterOptions } from '@/types/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  filterOptions: FilterOptions
  className?: string
}

export const RemoveFilters: React.FC<Props> = ({ filterOptions }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isVisible = Object.entries(filterOptions).length > 0

  const createURL = (): string => {
    const params = new URLSearchParams(searchParams)
    Object.keys(filterOptions).forEach(key => {
      if (key === 'subCategory') {
        params.delete('sub_category')
      } else {
        params.delete(key)
      }
    })
    params.set('page', '1')
    return `${pathname}?${params.toString()}`
  }

  const removeFilters = (): void => {
    router.push(createURL())
  }

  return (
    <button
      onClick={removeFilters}
      aria-label='remove filters'
      className={`${isVisible ? 'visible' : 'invisible'} px-3 py-1.5 text-[14px] font-medium text-secondary transition-colors rounded-full hover:text-active hover:bg-selected`}
    >
      Borrar Filtros
    </button>
  )
}
