/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Areafield, Emailfield, Textfield } from '../forms'
import { sendEmail } from '@/app/actions'
import { useEffect, useState } from 'react'
import { FormInput } from '@/types/types'

interface Message {
  success: boolean
  message: string
}

export const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<null | Message>(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>()

  useEffect(() => {
    if (message != null) {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }, [message])

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true)
    const success = await sendEmail(data)
    if (success) {
      reset()
      setMessage({ success: true, message: '*Mensaje enviado correctamente' })
    } else {
      setMessage({ success: false, message: '*Error al enviar el mensaje' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col gap-3'>
      <Textfield register={register} label='Nombre' name='name' placeholder='Nombre...' required disabled={loading} error={errors.name} />
      <Emailfield register={register} label='Email' name='email' placeholder='example@email.com' required disabled={loading} error={errors.email} />
      <Textfield register={register} label='Asunto' name='subject' placeholder='Asunto...' required disabled={loading} error={errors.subject} />
      <Areafield register={register} label='Mensaje' name='message' placeholder='Tú mensaje...' required disabled={loading} error={errors.message} />

      <button type='submit' disabled={loading} className={`${loading ? 'cursor-wait' : 'cursor-pointer'} mt-3 font-medium py-2 px-3 rounded-full bg-active/75 disabled:bg-active/50 border border-transparent text-primary transition-colors hover:bg-active`}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
      {message !== null && <span className={`${message.success ? 'text-green-500' : 'text-error'}`}>{message.message}</span>}
    </form>
  )
}
