/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { OrderByEnum } from '@/types/enums'
import { orderByItems } from '@/helpers/order-by'
import { Listbox, Transition } from '@headlessui/react'
import { DownIcon } from '@/icons'
import { OrderBy } from '@/types/types'
import Link from 'next/link'

interface Props {
  orderBy: OrderByEnum
}

export const OrderBySelect: React.FC<Props> = ({ orderBy }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selected, setSelected] = useState(orderByItems.find(ob => ob.value === orderBy))

  useEffect(() => {
    setSelected(orderByItems.find(ob => ob.value === orderBy))
  }, [orderBy])

  const createPageURL = (orderBy: string): string => {
    const params = new URLSearchParams(searchParams)
    params.set('order_by', orderBy)
    params.set('page', '1')
    return `${pathname}?${params.toString()}`
  }

  const onChange = (value: OrderBy): void => {
    setSelected(value)
    router.push(createPageURL(value.value))
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className='relative w-[170px] sm:w-[200px]'>
          <Listbox.Button
            id='Order by select'
            className={`group relative flex items-center w-full rounded-md cursor-pointer transition-colors border hover:border-active ${open ? 'border-active' : 'border-primary'}`}
            aria-label='Order by select'
          >
            <span className={`absolute -top-3 left-2 px-1 bg-page text-[14px] ${open ? 'text-active' : 'text-secondary'} group-hover:text-active transition-text-colors`}>Ordernar por</span>
            <span className='block px-2 sm:px-4 py-1 sm:py-1.5 w-full text-left text-primary border-r border-primary'>{selected?.label}</span>
            <span className='block px-1.5 sm:px-3'>
              <DownIcon className={`icon-secondary transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
            </span>
          </Listbox.Button>
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
                {orderByItems.map((item, idx) => (
                  <Link key={idx} href={createPageURL(item.value)}>
                    <Listbox.Option
                      key={idx}
                      value={item}
                      className={({ selected }) => `relative cursor-pointer select-none py-1.5 pl-3 text-primary ${selected ? 'bg-selected' : ''} ${!selected ? 'hover:bg-hover active:bg-selected' : ''}`}
                    >
                      {item.label}
                    </Listbox.Option>
                  </Link>
                ))}
              </Listbox.Options>
            </Transition>
          )}
        </div>
      )}
    </Listbox>
  )
}
