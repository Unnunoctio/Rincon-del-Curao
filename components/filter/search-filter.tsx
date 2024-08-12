import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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

  const [searchValue, setSearchValue] = useState(value ?? '')

  useEffect(() => {
    setSearchValue(value ?? '')
  }, [value])

  const onChange = (term: string): void => {
    setSearchValue(term)
    handleSearch(term)
  }

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
        value={searchValue}
        onChange={(e) => onChange(e.target.value)}
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
