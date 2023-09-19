'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const DeleteFilters = (): React.ReactNode => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [deleteFilters, setDeleteFilters] = useState(false)

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
    <button
      aria-label='Delete Filters'
      onClick={handleDeleteFilters}
      className={`${deleteFilters ? 'visible' : 'invisible'} px-2 py-1.5 text-[14px] font-medium text-secondary transition-colors rounded-md hover:text-active hover:bg-selected`}
    >
      Borrar Filtros
    </button>
  )
}
