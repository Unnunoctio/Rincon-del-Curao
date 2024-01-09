'use client'

import { DownIcon, XIcon } from '@/icons'
import { OptionType } from '@/types/api'
import { Listbox, Transition } from '@headlessui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

interface Props {
  name: string
  options: OptionType[]
  ariaLabel: string
}

export const MultiSelect: React.FC<Props> = ({ name, options, ariaLabel }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const values = searchParams.getAll(name) ?? []

  const [selected, setSelected] = useState(options.filter(o => values.includes(o.value) && o.count > 0))

  useEffect(() => {
    setSelected(options.filter(o => values.includes(o.value) && o.count > 0))
  }, [options])

  const createURL = (newValues: OptionType[]): string => {
    const params = new URLSearchParams(searchParams)
    params.delete(name)
    newValues.forEach(option => params.append(name, option.value))
    params.set('page', '1')
    return `${pathname}?${params.toString()}`
  }

  const onRemove = (option: OptionType): void => {
    const newValues = selected.filter(o => o.value !== option.value)
    setSelected(newValues)
    router.push(createURL(newValues))
  }

  const onChange = (newValues: OptionType[]): void => {
    setSelected(newValues)
    router.push(createURL(newValues))
  }

  return (
    <Listbox value={selected} onChange={onChange} multiple>
      {({ open }) => (
        <div className='relative'>
          <div className={`flex justify-between overflow-hidden w-full min-h-[38px] transition-colors rounded-md border ${open ? 'border-active' : 'border-primary'}`}>
            <ul className='flex flex-wrap gap-1 px-2 py-1 w-full justify-start border-r border-primary overflow-hidden items-center'>
              {selected.map(option => (
                <li key={option.value} className='flex items-center gap-1 pl-2 pr-1 h-[25px] overflow-hidden rounded-full bg-active/60'>
                  <span className='block w-full truncate text-[14px]'>{option.label}</span>
                  <button onClick={() => onRemove(option)} className='group' aria-label={`eliminar ${option.label.toLowerCase()}`}>
                    <XIcon className='w-5 h-5 icon-stroke-primary-60 group-hover:icon-stroke-primary transition-colors' />
                  </button>
                </li>
              ))}
            </ul>
            <Listbox.Button id={`${name}-select`} aria-label={ariaLabel} className='flex items-center px-3 transition-colors hover:bg-selected'>
              <DownIcon className={`icon-secondary transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
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
                {options.filter(o => (selected.find(s => s.value === o.value) === undefined) && o.count > 0).map(option => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className='relative cursor-pointer select-none py-1.5 pl-3 text-primary hover:bg-hover active:bg-selected'
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
