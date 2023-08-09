'use client'

import { getDefaultOrderBy, getOrderBy, orderByItems } from '@/helpers/orderByHelper'
import { OrderByItem } from '@/helpers/types'
import { ChevronDownIcon } from '@/icons'
import { Listbox, Transition } from '@headlessui/react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, Fragment, useCallback, useEffect } from 'react'

const items = [
  { value: 'SCORE_DESC', label: 'Recomendados' },
  { value: 'PRICE_DESC', label: 'Mayor Precio' },
  { value: 'PRICE_ASC', label: 'Menor Precio' },
  { value: 'NAME_ASC', label: 'A - Z' },
  { value: 'NAME_DESC', label: 'Z - A' }
]

export const OrderBySelect = (): React.ReactNode => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(getDefaultOrderBy(searchParams.get('order_by')))

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
  }, [searchParams])

  // validaciones:
  // order_by es un valor no válido, se redirecciona
  // selected value !== order_by value, se actualiza
  useEffect(() => {
    const itemUrl = getOrderBy(searchParams.get('order_by'))
    if (itemUrl === undefined) {
      router.replace(pathname + '?' + createQueryString('order_by', items[0].value))
    } else {
      if (itemUrl.value !== selected.value) {
        setSelected(itemUrl)
      }
    }
  }, [searchParams.get('order_by')])

  const selectItem = (item: OrderByItem): void => {
    setSelected(item)
    router.push(pathname + '?' + createQueryString('order_by', item.value))
  }

  return (
    <Listbox value={selected} onChange={selectItem}>
      {({ open }) => (
        <div className='relative'>
          <Listbox.Button
            id='OrderBySelect'
            className={`group relative flex items-center w-[200px] rounded-md border ${open ? 'border-active' : 'border-primary'} hover:border-active cursor-pointer transition-colors`}
            aria-label='Order By'
          >
            <span className={`absolute -top-3 left-2 px-1 bg-page text-[14px] ${open ? 'text-active' : 'text-secondary'} group-hover:text-active transition-text-colors`}>
              Ordenar por
            </span>
            <span className='block px-4 py-1.5 w-full text-left'>{selected.label}</span>
            <span className='h-5 border-l border-primary' />
            <span className='block px-3'>
              <ChevronDownIcon className={`icon-secondary transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
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
              <Listbox.Options className='absolute overflow-auto my-2 py-2 max-h-60 w-full bg-primary rounded-md border divider-primary shadow-md'>
                {orderByItems.map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={item}
                    className={({ selected }) => `relative cursor-pointer select-none py-1.5 pl-3 ${selected ? 'bg-selected' : ''} ${!selected ? 'hover:bg-hover active:bg-selected' : ''}`}
                  >
                    {item.label}
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
