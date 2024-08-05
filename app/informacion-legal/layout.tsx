import { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { createBreadcrumbLinks } from '@/helpers/path'
import { LegalTab } from '@/components/legal-tab'

export const metadata: Metadata = {
  title: 'Información Legal'
}

interface Props {
  children: React.ReactNode
}

export default function InfoLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', 'Información Legal'])} />
      <section className='layout-legal'>
        <nav className='legal-nav'>
          <LegalTab link='/informacion-legal/terminos-y-condiciones' label='Términos y Condiciones' />
          <LegalTab link='/informacion-legal/politica-de-privacidad' label='Política de Privacidad' />
        </nav>
        <div className='legal-container'>
          {children}
        </div>
      </section>
    </>
  )
}
