'use client'

import { ObjectFilter } from '@/helpers/types'
import { ChevronDownIcon, XIcon } from '@/icons'
import { Listbox, Transition } from '@headlessui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'

const getDefaultValues = (values: string[], options: ObjectFilter[]): ObjectFilter[] => {
  if (values.length === 0) {
    return []
  }
  return options.filter((option) => values.includes(option.value.toString()))
}

export const MultiSelectV2 = ({ queryName, options }: { queryName: string, options: ObjectFilter[] }): React.ReactNode => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedOption, setSelectedOption] = useState<ObjectFilter[]>(getDefaultValues(searchParams.getAll(queryName), options))

  const createQueryString = useCallback((name: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(name)
    params.delete('page')
    values.forEach((value) => params.append(name, value))

    return params.toString()
  }, [searchParams])

  useEffect(() => {
    const values = searchParams.getAll(queryName)
    if (values.length > 0) {
      const optionsValues = options.filter((option) => values.includes(option.value.toString()))
      setSelectedOption(optionsValues)
    } else {
      setSelectedOption([])
    }
  }, [searchParams])

  const onSelectedRemove = (item: ObjectFilter): void => {
    const values = selectedOption.filter((option) => option.value !== item.value)
    setSelectedOption(values)
    const valuesString = values.map((option) => option.value.toString())
    router.push(pathname + '?' + createQueryString(queryName, valuesString))
  }

  const onChange = (values: ObjectFilter[]): any => {
    setSelectedOption(values)
    const valuesString = values.map((option) => option.value.toString())
    router.push(pathname + '?' + createQueryString(queryName, valuesString))
  }

  return (
    <Listbox value={selectedOption} onChange={onChange} multiple>
      {({ open }) => (
        <div className='relative'>
          <div className={`flex justify-between overflow-hidden w-full min-h-[38px] rounded-md border ${open ? 'border-active' : 'border-primary'} transition-colors`}>
            <ul className='flex flex-wrap gap-1 px-2 py-1 w-full justify-start border-r border-primary overflow-hidden'>
              {selectedOption.map((option) => (
                <li
                  key={option.value}
                  className='flex items-center gap-1 pl-2 pr-1 py-0.5 overflow-hidden rounded-md bg-active/60'
                >
                  <span className='block w-full overflow-hidden whitespace-nowrap text-ellipsis text-[14px] font-medium'>
                    {option.label}
                  </span>
                  <button onClick={() => onSelectedRemove(option)} className='group'>
                    <XIcon className='w-5 h-5 icon-stroke-primary-60 group-hover:icon-stroke-primary transition-colors' />
                  </button>
                </li>
              ))}
            </ul>
            <Listbox.Button id='MultiSelect' className='flex items-center px-3 transition-colors hover:bg-selected' aria-label='Multi Select'>
              <ChevronDownIcon className={`icon-secondary transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
            </Listbox.Button>
          </div>
          {open && (
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition ease-in duration-75'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute overflow-auto z-10 my-2 py-2 max-h-60 w-full bg-primary rounded-md border divider-primary shadow-md'>
                {options.filter((option) => selectedOption.find((selected) => selected.value === option.value) == null).map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ selected }) => `relative cursor-pointer select-none py-1.5 pl-3 text-primary ${selected ? 'bg-selected' : ''} ${!selected ? 'hover:bg-hover active:bg-selected' : ''}`}
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          )}
        </div>
      )}
    </Listbox>
  )
}
