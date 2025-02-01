'use client'

import { CheckIcon } from '@/icons/layout/check-icon'
import { JSX, useState } from 'react'

interface Props {
  value: string
  label: string
  checked: boolean
}

export const WebCheckbox: React.FC<Props> = ({ value, label, checked }): JSX.Element => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = (): void => {
    setIsChecked(!isChecked)
  }

  return (
    <label className='n-modal-website-checkbox-label'>
      <div className='group n-modal-website-checkbox-item-container' aria-checked={isChecked}>
        <input
          name='prefer-web'
          type='checkbox'
          defaultChecked={isChecked}
          onChange={handleChange}
          value={value}
          className='n-modal-website-checkbox-input'
        />
        <CheckIcon className='n-modal-website-checkbox-icon' />
      </div>
      {label}
    </label>
  )
}
