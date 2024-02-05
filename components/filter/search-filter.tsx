'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  const [defaultValue, setDefaultValue] = useState(value ?? '')

  useEffect(() => {
    setDefaultValue(value ?? '')
  }, [value])

  const handleSearch = (term: string): void => {
    setDefaultValue(term)

    const params = new URLSearchParams(searchParams)
    if (term !== '') {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='relative'>
      <label htmlFor={name} className='text-primary text-[18px] font-medium'>
        {label}
      </label>
      <input
        value={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        id={name}
        name={name}
        type='text'
        placeholder={placeholder}
        autoComplete='off'
        className='appearance-none block px-2 py-1.5 w-full hover:bg-selected rounded-md bg-transparent border border-primary focus:bg-selected focus:ring-transparent focus:ring-offset-transparent focus:border-active'
        aria-label={aria}
      />
    </div>
  )
}
