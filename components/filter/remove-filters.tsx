import { Filter } from '@/types/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  filter: Filter
  className?: string
}

export const RemoveFilters: React.FC<Props> = ({ filter }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isVisible = Object.entries(filter).length > 1

  const createURL = (): string => {
    const params = new URLSearchParams(searchParams)
    Object.keys(filter).forEach(key => {
      if (key === 'subCategory') params.delete('sub_category')
      else if (key === 'priceMin') params.delete('price_min')
      else if (key === 'priceMax') params.delete('price_max')
      else if (key === 'abvMin') params.delete('abv_min')
      else if (key === 'abvMax') params.delete('abv_max')
      else params.delete(key)
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
      aria-label='borrar filtros'
      className={`${isVisible ? 'filter-remove' : 'filter-remove-invisible'} `}
    >
      Borrar Filtros
    </button>
  )
}
