/* eslint-disable @typescript-eslint/no-misused-promises */
import { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb/breadcrumb'
import { createBreadcrumbLinks } from '@/helpers/path'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contacto'
}

export default function ContactPage (): JSX.Element {
  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', 'Contacto'])} />
      <section className='my-10 flex justify-center items-center'>
        <div className='flex flex-col w-full max-w-[750px] p-3 md:p-6 rounded-lg'>
          <h1 className='mb-3 text-3xl font-medium text-primary'>Contacto</h1>
          <span className='text-primary'>Considerar que:</span>
          <ul className='text-primary pl-6 list-disc'>
            <li>Rincón del Curao no es una tienda, es un comparador de precios, por lo tanto no vendemos productos.</li>
            <li>El formulario de contacto <strong>no es una línea de ayuda o asesoría personal.</strong></li>
          </ul>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
