'use client'

import { useState } from 'react'

interface Props {
  value: string
  label: string
  checked: boolean
}

export const WebCheckbox: React.FC<Props> = ({ value, label, checked }) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = (): void => {
    setIsChecked(!isChecked)
  }

  return (
    <label className='flex items-center text-primary font-medium p-3 w-fit h-fit select-none cursor-pointer'>
      <input
        name='webs'
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        value={value}
        className='appearance-none cursor-pointer w-5 h-5 mr-2 text-active bg-transparent border-primary rounded focus:ring-transparent focus:ring-offset-transparent checked:border-active'
      />
      {label}
    </label>
  )
}
