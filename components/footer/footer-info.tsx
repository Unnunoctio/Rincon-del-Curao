import Link from 'next/link'

export const FooterInfo: React.FC = () => {
  return (
    <div className='footer-container-info'>
      <h3 className='footer-text-title'>Centro de Ayuda</h3>
      <ul className='footer-list-items'>
        <li>
          <Link href='/informacion-legal/terminos-y-condiciones' className='footer-link-item'>Términos y Condiciones</Link>
        </li>
        <li>
          <Link href='/informacion-legal/politica-de-privacidad' className='footer-link-item'>Política de Privacidad</Link>
        </li>
        <li>
          <Link href='/contacto' className='footer-link-item'>Contacto</Link>
        </li>
        {/* <li>
          <Link href='' className='footer-link-item'>Roadmap</Link>
        </li> */}
      </ul>
    </div>
  )
}
