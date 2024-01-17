'use client'

import { Tab } from '@headlessui/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LegalTab } from './legal-tab'

interface Props {
  tab: string
}

export const LegalGroup: React.FC<Props> = ({ tab }): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(() => {
    if (tab === 'terms') return 0
    if (tab === 'policies') return 1
    return 0
  })
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (tab === 'terms') setSelectedTab(0)
    if (tab === 'policies') setSelectedTab(1)
  }, [tab])

  const createUrl = (tab: string): string => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', tab)
    return `${pathname}?${params.toString()}`
  }

  return (
    <Tab.Group as='div' className='flex flex-col lg:flex-row justify-between gap-2 lg:gap-10' selectedIndex={selectedTab} onChange={setSelectedTab}>
      <Tab.List className='flex flex-row lg:flex-col gap-1 mt-6 min-w-[200px] items-start h-auto'>
        <LegalTab link={createUrl('terms')} label='Términos y Condiciones' selected={tab === 'terms'} />
        <LegalTab link={createUrl('policies')} label='Política de Privacidad' selected={tab === 'policies'} />
      </Tab.List>
      <Tab.Panels className='w-full max-w-[1000px]'>
        <Tab.Panel>
          <h1 className='my-4 text-3xl font-medium text-primary'>Términos y Condiciones</h1>
          <p className='text-primary'>
            Al hacer uso de este sitio web, se presume la aceptación total y sin reservas de todas las condiciones generales de uso detalladas a continuación. Estas condiciones también son aplicables a la información, aplicaciones y servicios accesibles a través del sitio.
          </p>
          <br />
          <ol className='flex flex-col gap-3 text-primary list-decimal pl-6'>
            <li>Rincón del Curao se esfuerza al máximo por mantener la información actualizada y prevenir errores u omisiones. No obstante, no asume responsabilidad alguna en cuanto a la integridad y precisión de dicha información, considerándola únicamente con fines referenciales.</li>
            <li>Para garantizar el adecuado rendimiento del sitio, podría ser necesario emplear cookies.</li>
            <li>La información sobre precios y características de los productos publicados es meramente referencial y debe ser verificada con los proveedores correspondientes.</li>
            <li>Rincón del Curao se reserva el derecho de eliminar, modificar y actualizar de manera unilateral y arbitraria la información, configuración y contenido del sitio, así como sus condiciones y términos de uso.</li>
          </ol>
        </Tab.Panel>
        <Tab.Panel>
          <h1 className='my-4 text-3xl font-medium text-primary'>Política de Privacidad</h1>
          <p className='text-primary'>
            Con el propósito de garantizar el adecuado funcionamiento de rincondelcurao.com, el sitio almacena información sobre sus visitantes en cookies del navegador.
          </p>
          <p className='text-primary'>
            Esta página proporciona detalles sobre la información almacenada por rincondelcurao.com y cómo se utiliza.
          </p>
          <br />
          <h2 className='mb-2 text-2xl text-primary'>Información guardada</h2>
          <p className='text-primary'>Rincón del Curao almacena la siguiente información de sus visitantes:</p>
          <ul className='text-primary pl-6 list-disc'>
            <li>Tiendas donde cotizar</li>
          </ul>
          <br />
          <h2 className='mb-2 text-2xl text-primary'>Sobre el acceso a sitios de terceros</h2>
          <p className='text-primary'>
            En el curso de sus operaciones, Rincón del Curao redirige tráfico a sitios de comercio electrónico de terceros, los cuales podrían contar con políticas de privacidad y términos de servicio propios. No asumimos responsabilidad por la confidencialidad de la información de nuestros usuarios una vez que abandonan el sitio rincondelcurao.com.
          </p>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
