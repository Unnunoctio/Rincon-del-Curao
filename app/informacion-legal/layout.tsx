import { Breadcrumb } from '@/components/breadcrumb'
import { LegalTab } from '@/components/legal/legal-tab'
import { createBreadcrumbLinks } from '@/helpers/path'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Información Legal'
}

export default function InfoLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', 'Información Legal'])} />
      <section className='flex flex-col lg:flex-row justify-between gap-2 lg:gap-10 mt-6'>
        <nav className='flex flex-row lg:flex-col gap-1 min-w-[200px] items-start h-auto'>
          <LegalTab link='/informacion-legal/terminos-y-condiciones' label='Términos y Condiciones' />
          <LegalTab link='/informacion-legal/politica-de-privacidad' label='Política de Privacidad' />
        </nav>
        <div className='w-full max-w-[1000px]'>
          {children}
        </div>
      </section>
    </>
  )
}
