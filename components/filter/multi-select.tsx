/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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

export const MultiSelect: React.FC<Props> = ({ label, name, options, aria }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const values = searchParams.getAll(name) ?? []

  const [selected, setSelected] = useState(options.filter(o => values.includes(o.value) && o.count > 0))
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onMenuOpen = (): void => setIsMenuOpen(true)
  const onMenuClose = (): void => setIsMenuOpen(false)

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
    <div className='filter-input-container'>
      <span className='filter-input-label'>
        {label}
      </span>
      <Select
        aria-label={aria}
        id={name}
        name={name}
        value={selected}
        options={options.filter(o => (selected.find(s => s.value === o.value) === undefined) && o.count > 0)}
        onChange={onChange}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        isMulti
        isSearchable={false}
        closeMenuOnSelect={false}
        classNames={{
          control: () => `${isMenuOpen ? 'select-control-open' : 'select-control'}`,
          valueContainer: () => 'select-value-container',
          multiValue: () => 'select-multi-value',
          multiValueLabel: () => 'select-multi-value-label',
          multiValueRemove: () => 'group select-multi-value-remove',
          clearIndicator: () => 'select-clear-indicator',
          indicatorSeparator: () => 'select-separator',
          dropdownIndicator: () => `${isMenuOpen ? 'select-dropdown-open' : 'select-dropdown'}`,
          menu: () => 'select-menu',
          menuList: () => 'select-menu-list',
          option: () => 'select-menu-option'
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
                <XIcon className='select-multi-value-icon-remove' />
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
