/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Path, UseFormRegister } from 'react-hook-form'
import { FormInput } from '@/types/types'

interface Props {
  register: UseFormRegister<FormInput>
  label: string
  name: Path<FormInput>
  placeholder: string
  required?: boolean
  disabled?: boolean
  error: any
}

export const Emailfield: React.FC<Props> = ({ register, label, name, placeholder, required = false, disabled = false, error }) => {
  return (
    <div>
      <label htmlFor={name} className='textfield-label'>
        <span className={`textfield-text ${error ? 'textfield-text-error' : ''}`}>{label}</span>
        <input
          {...register(name, {
            required: { value: required, message: '*Este campo es requerido' },
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: '*Este email no es válido' }
          })}
          id={name}
          placeholder={placeholder}
          autoComplete='off'
          disabled={disabled}
          className={`textfield-input ${disabled ? 'textfield-input-disabled' : ''} ${error ? 'textfield-input-error' : ''}`}
        />
      </label>
      {error && <span className='textfield-span-error'>{error.message}</span>}
    </div>
  )
}
