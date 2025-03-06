'use client'

import { findOrderBy, orderByItems } from "@/config/order-by"
import { ChevronDownIcon } from "@/icons/chevron-down"
import { useProductsFilter } from "@/providers/products-filter-provider"
import { OrderBy as OrderByType } from "@/types"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"



export const OrderBy = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { orderByProducts } = useProductsFilter()

  const [selected, setSelected] = useState(findOrderBy(orderByProducts))

  useEffect(() => {
    setSelected(findOrderBy(orderByProducts))
  }, [orderByProducts])

  const createURL = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('order_by', value)
    params.set('page', '1')
    return `${pathname}?${params.toString()}`
  }

  const onChange = (value: OrderByType): void => {
    setSelected(value)
    router.push(createURL(value.value))
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      <ListboxButton className="group relative flex justify-between items-center py-1.5 pr-2 pl-3 border border-c-silver-gray data-[open]:border-c-old-gold hover:border-c-snow-white rounded-md w-full max-w-[192px] h-fit cursor-pointer">
        <span className="group-data-[open]:text-c-old-gold group-hover:text-c-snow-white -top-3 left-1.5 absolute bg-c-lead-gray px-1 text-[14px] text-c-silver-gray">
          Ordenar por
        </span>
        {selected.label}
        <ChevronDownIcon className="stroke-c-silver-gray w-6 h-6 group-data-[open]:-rotate-180 transition-[rotate]" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        modal={false}
        transition
        className="absolute bg-c-lead-gray overfbg-c-lead-gray shadow-md my-1 py-2 border border-c-silver-gray rounded-md w-[var(--button-width)] max-h-60 [--anchor-gap:var(--spacing-1)]"
      >
        {orderByItems.map((item, index) => (
          <ListboxOption
            key={index}
            value={item}
            className="relative data-[selected]:bg-c-industrial-gray active:bg-c-industrial-gray hover:bg-c-shadow-gray py-1.5 pl-3 cursor-pointer select-none"
          >
            {item.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}
