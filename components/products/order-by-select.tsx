/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { orderByItems } from '@/helpers/order-by'
import { DownIcon } from '@/icons'
import { OrderByEnum } from '@/types/enums'
import { Listbox, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useState } from 'react'

export const OrderBySelect: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const orderBy = searchParams.get('order_by') ?? OrderByEnum.SCORE_DESC

  const [selected, setSelected] = useState(orderByItems.find(ob => ob.value === orderBy))

  const createPageURL = (orderBy: string): string => {
    const params = new URLSearchParams(searchParams)
    params.set('order_by', orderBy)
    params.set('page', '1')
    return `${pathname}?${params.toString()}`
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
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
