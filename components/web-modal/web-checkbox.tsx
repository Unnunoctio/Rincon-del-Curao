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
    <label className='web-checkbox-label'>
      <input
        name='webs'
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        value={value}
        className='web-checkbox-input'
      />
      {label}
    </label>
  )
}
