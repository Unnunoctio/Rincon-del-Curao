'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ProductsCount } from '../ProductsCount'
import { MultiSelectV2 } from './MultiSelectV2'

export const FilterProducts = (): React.ReactNode => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [deleteFilters, setDeleteFilters] = useState<Boolean>(false)

  useEffect(() => {
    let count = 0
    searchParams.forEach((key) => count++)
    if (count > 2) {
      setDeleteFilters(true)
    } else {
      setDeleteFilters(false)
    }
  }, [searchParams])

  const handleDeleteFilters = (): void => {
    setDeleteFilters(false)
    router.push(pathname)
  }

  return (
    <section className='flex flex-col w-full h-full'>
      <header className='flex items-baseline justify-between pb-2 border-b divider-primary'>
        <ProductsCount className='text-active' />
        <button
          aria-label='Delete Filters'
          onClick={handleDeleteFilters}
          className={`${deleteFilters === true ? 'visible' : 'invisible'} px-2 py-1.5 text-[14px] font-medium text-secondary transition-colors rounded-md hover:text-active hover:bg-selected`}
        >
          Borrar Filtros
        </button>
      </header>
      <div className='flex flex-col gap-2 py-3'>
        <MultiSelectV2 />
      </div>
    </section>
  )
}
