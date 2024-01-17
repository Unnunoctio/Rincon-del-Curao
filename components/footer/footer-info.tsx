import Link from 'next/link'

export const FooterInfo: React.FC = () => {
  return (
    <div className='text-center sm:text-start'>
      <h3 className='text-[18px] font-medium text-primary'>Centro de Ayuda</h3>
      <ul className='flex flex-col gap-2 sm:gap-3 mt-3'>
        <li>
          <Link href='/informaciones_legales?tab=terms' className='w-fit text-secondary hover:underline'>Términos y Condiciones</Link>
        </li>
        <li>
          <Link href='/informaciones_legales?tab=policies' className='w-fit text-secondary hover:underline'>Política de Privacidad</Link>
        </li>
        <li>
          <Link href='/contacto' className='w-fit text-secondary hover:underline'>Contacto</Link>
        </li>
        {/* <li>
          <Link href='' className='w-fit text-secondary hover:underline'>Roadmap</Link>
        </li> */}
      </ul>
    </div>
  )
}
