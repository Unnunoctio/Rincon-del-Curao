'use server'

import { FormInput } from '@/types/types'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

// COOKIES -------------------------

export async function getCookie (key: string): Promise <string | undefined> {
  const cookieStore = cookies()
  const cookie = cookieStore.get(key)
  if (cookie !== undefined) {
    return cookie.value
  }
  return undefined
}

export async function setPrefWebs (formData: FormData): Promise <boolean> {
  const prefWebs = formData.getAll('webs').join(',')
  if (prefWebs === '') return false

  const cookieStore = cookies()
  cookieStore.set('prefWebs', prefWebs)
  return true
}

// SEND EMAIL CONTACT --------------

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail (formData: FormInput): Promise <boolean> {
  const { error } = await resend.emails.send({
    from: 'Contact <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL as string,
    subject: formData.subject,
    html: `
      <div>
        <h1>Formulario de Contacto</h1>
        <p>
          <strong>Nombre:</strong> ${formData.name}<br />
          <strong>Email:</strong> ${formData.email}<br />
          <strong>Mensaje:</strong> ${formData.message}
        </p>
      </div>
    `
  })

  if (error != null) return false
  return true
}
