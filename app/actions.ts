'use server'

import { FormInput } from '@/types/types'
import { Resend } from 'resend'

// SEND EMAIL CONTACT ---------------------------
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
