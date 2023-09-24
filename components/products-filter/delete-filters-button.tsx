'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const DeleteFiltersButton: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let count = 0
    searchParams.forEach((_, key) => {
      if (key !== 'page' && key !== 'order_by') {
        count++
      }
    })
    if (count === 0) setVisible(false)
    else setVisible(true)
  }, [searchParams])

  const handleDeleteFilters = (): void => {
    setVisible(false)
    router.push(pathname)
  }

  return (
    <button
      onClick={handleDeleteFilters}
      className={`${visible ? 'visible' : 'invisible'} px-2 py-1.5 text-[14px] font-medium text-secondary transition-colors rounded-md hover:text-active hover:bg-selected`}
      aria-label='delete filters'
    >
      Borrar Filtros
    </button>
  )
}
