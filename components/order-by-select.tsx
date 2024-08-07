'use client'

import { orderByFind, orderByItems } from '@/helpers/order-by'
import { DownIcon } from '@/icons'
import { OrderByEnum } from '@/types/enums'
import { OrderBy } from '@/types/types'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  orderBy: OrderByEnum
}

export const OrderBySelect: React.FC<Props> = ({ orderBy }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selected, setSelected] = useState(orderByFind(orderBy))

  useEffect(() => {
    setSelected(orderByFind(orderBy))
  }, [orderBy])

  const createURL = (ob: string): string => {
    const params = new URLSearchParams(searchParams)
    params.set('order_by', ob)
    params.set('page', '1')
    return `${pathname}?${params.toString()}`
  }

  const onChange = (value: OrderBy): void => {
    setSelected(value)
    router.push(createURL(value.value))
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      <ListboxButton className='group order-by-button-container'>
        <span className='order-by-button-top'>Ordenar por</span>
        <span className='order-by-button-text'>{selected.label}</span>
        <span className='order-by-button-icon-container'>
          <DownIcon className='order-by-button-icon' />
        </span>
      </ListboxButton>
      <ListboxOptions
        anchor='bottom'
        modal={false}
        transition
        className='order-by-options'
      >
        {orderByItems.map((ob, index) => (
          <ListboxOption
            key={index}
            value={ob}
            className='order-by-option'
          >
            {ob.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}
