import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  label: string
  name: string
  value: string | undefined
  aria: string
  placeholder: string
}

export const SearchFilter: React.FC<Props> = ({ label, name, value, aria, placeholder }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = useDebouncedCallback((term: string): void => {
    const params = new URLSearchParams(searchParams)
    if (term !== '') {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }, 750)

  return (
    <div className='filter-input-container'>
      <span className='filter-input-label'>
        {label}
      </span>
      <input
        defaultValue={value}
        onChange={(e) => handleSearch(e.target.value)}
        name={name}
        placeholder={placeholder}
        autoComplete='off'
        autoFocus={false}
        className='search-input-container'
        aria-label={aria}
      />
    </div>
  )
}
