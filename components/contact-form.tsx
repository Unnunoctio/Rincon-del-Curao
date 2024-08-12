/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Slide, toast } from 'react-toastify'
import { Areafield, Emailfield, Textfield } from './forms'
import { FormInput } from '@/types/types'
import { sendEmail } from '@/app/actions'

export const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>()

  const successNotify = (): any => toast.success('Mensaje enviado correctamente', {
    containerId: 'notification',
    autoClose: 3000,
    theme: 'colored',
    transition: Slide
  })
  const errorNotify = (): any => toast.error('Error al enviar el mensaje', {
    containerId: 'notification',
    autoClose: 3000,
    theme: 'colored',
    transition: Slide
  })

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true)
    const success = await sendEmail(data)
    if (success) {
      reset()
      successNotify()
    } else {
      errorNotify()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='contact-form-container'>
      <Textfield register={register} label='Nombre' name='name' placeholder='Nombre...' required disabled={loading} error={errors.name} />
      <Emailfield register={register} label='Email' name='email' placeholder='example@email.com' required disabled={loading} error={errors.email} />
      <Textfield register={register} label='Asunto' name='subject' placeholder='Asunto...' required disabled={loading} error={errors.subject} />
      <Areafield register={register} label='Mensaje' name='message' placeholder='Tú mensaje...' required disabled={loading} error={errors.message} />

      <button type='submit' disabled={loading} className={`${loading ? 'cursor-wait' : 'cursor-pointer'} contact-form-button`}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
