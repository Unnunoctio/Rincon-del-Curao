/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FormInput } from '@/types/types'
import { Path, UseFormRegister } from 'react-hook-form'

interface Props {
  register: UseFormRegister<FormInput>
  label: string
  name: Path<FormInput>
  placeholder: string
  required?: boolean
  disabled?: boolean
  error: any
}

export const Areafield: React.FC<Props> = ({ register, label, name, placeholder, required = false, disabled = false, error }) => {
  return (
    <div>
      <label htmlFor={name} className='relative flex flex-1 flex-col gap-1'>
        <span className={`text-primary ${error ? 'text-error' : ''} w-fit font-medium`}>{label}</span>
        <textarea
          {...register(name, { required: { value: required, message: '*Este campo es requerido' } })}
          id={name}
          placeholder={placeholder}
          autoComplete='off'
          rows={5}
          disabled={disabled}
          className={`appearance-none ${disabled ? 'cursor-not-allowed' : 'cursor-text'} block w-full rounded-md bg-transparent hover:bg-selected focus:bg-selected border border-primary ${error ? 'border-error' : ''} py-[9px] focus:ring-transparent focus:ring-offset-transparent focus:border-active`}
        />
      </label>
      {error && <span className='text-sm text-error'>{error.message}</span>}
    </div>
  )
}
