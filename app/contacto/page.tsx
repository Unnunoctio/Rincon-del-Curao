import { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { ContactForm } from '@/components/contact-form'
import { createBreadcrumbLinks } from '@/helpers/path'

export const metadata: Metadata = {
  title: 'Contacto'
}

export default function ContactPage (): JSX.Element {
  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', 'Contacto'])} />
      <section className='layout-contact'>
        <div className='contact-container'>
          <h1 className='contact-title'>Contacto</h1>
          <span>Considerar que:</span>
          <ul className='contact-list'>
            <li>Rincón del Curao no es una tienda, es un comparador de precios, por lo tanto no vendemos productos.</li>
            <li>El formulario de contacto <strong>no es una línea de ayuda o asesoría personal.</strong></li>
          </ul>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
