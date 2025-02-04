'use client'

import { CheckIcon } from '@/icons/layout/check-icon'
import { JSX, useState } from 'react'

interface Props {
  value: string
  label: string
  checked: boolean
  disabled?: boolean
}

export const WebCheckbox: React.FC<Props> = ({ value, label, checked, disabled = false }): JSX.Element => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = (): void => {
    setIsChecked(!isChecked)
  }

  return (
    <label aria-disabled={disabled} className='n-modal-website-checkbox-label'>
      <div aria-checked={isChecked} className='group n-modal-website-checkbox-item-container'>
        <input
          name='prefer-web'
          type='checkbox'
          defaultChecked={isChecked}
          onChange={handleChange}
          value={value}
          disabled={disabled}
          className='n-modal-website-checkbox-input'
        />
        <CheckIcon className='n-modal-website-checkbox-icon' />
      </div>
      {label}
    </label>
  )
}
