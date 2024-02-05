'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { OptionType } from '@/types/api'
import Select, { components } from 'react-select'
import { XIcon } from '@/icons'

interface Props {
  label: string
  name: string
  options: OptionType[]
  aria: string
}

export const MultiSelectV2: React.FC<Props> = ({ label, name, options, aria }) => {
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

  const onChange = (newValues: any): void => {
    setSelected(newValues)
    router.push(createURL(newValues))
  }

  return (
    <div className='relative'>
      <label className='text-primary text-[18px] font-medium'>
        {label}
      </label>
      <Select
        value={selected}
        onChange={onChange}
        id={name}
        name={name}
        isMulti
        options={options.filter(o => (selected.find(s => s.value === o.value) === undefined) && o.count > 0)}
        aria-label={aria}
        classNames={{
          control: (state) => `flex w-full min-h-[38px] transition-colors hover:bg-selected cursor-pointer border rounded-md ${state.isFocused ? 'border-active' : 'border-primary'}`,
          valueContainer: () => 'flex flex-1 flex-wrap items-center justify-start overflow-hidden gap-1 px-2 py-1 ',
          multiValue: () => 'flex items-center gap-1 pl-2 h-[26px] overflow-hidden bg-active/60 rounded-md',
          multiValueLabel: () => 'text-[14px] truncate text-primary',
          multiValueRemove: () => 'group flex items-center justify-center w-[26px] h-[26px] hover:bg-red-300/50',
          clearIndicator: () => 'hidden',
          indicatorSeparator: () => 'h-full border-l border-primary',
          dropdownIndicator: (state) => `px-3 text-secondary transition-transform ${state.isFocused ? 'rotate-180' : 'rotate-0'}`,
          menu: () => 'absolute overflow-hidden z-10 my-2 w-full bg-primary rounded-md border divider-primary shadow-md',
          menuList: () => 'overflow-auto py-2 max-h-60',
          option: () => 'cursor-pointer selec-none py-1.5 pl-3 text-primary hover:bg-hover active:bg-selected',
          input: () => 'text-primary'
        }}
        styles={{
          control: () => { return {} },
          valueContainer: () => { return {} },
          multiValue: () => { return {} },
          multiValueLabel: () => { return {} },
          multiValueRemove: () => { return {} },
          clearIndicator: () => { return {} },
          indicatorSeparator: () => { return {} },
          dropdownIndicator: () => { return {} },
          menu: () => { return {} },
          menuList: () => { return {} },
          option: () => { return {} },
          placeholder: () => ({ display: 'none' }),
          input: (base) => ({
            ...base,
            margin: 0,
            color: 'none'
          })
        }}
        components={{
          MultiValueRemove: (props) => {
            return (
              <components.MultiValueRemove {...props}>
                <XIcon className='w-5 h-5 icon-stroke-primary-60 group-hover:stroke-red-600' />
              </components.MultiValueRemove>
            )
          },
          NoOptionsMessage: (props) => {
            return (
              <components.NoOptionsMessage {...props}>
                Sin Opciones
              </components.NoOptionsMessage>
            )
          }
        }}
      />
    </div>
  )
}
