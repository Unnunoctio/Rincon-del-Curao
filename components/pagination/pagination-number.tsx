import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Props {
  page: number
  isActive: boolean
  className?: string
}

export const PaginationNumber: React.FC<Props> = ({ page, isActive }) => {
  if (page === null) {
    return (
      <div className='pagination-more'>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    )
  }

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createURL = (page: string | number): string => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <Link href={createURL(page)} aria-label={`página ${page}`} className={`${isActive ? 'pagination-number-active' : 'pagination-number'}`}>
      {page}
    </Link>
  )
}
