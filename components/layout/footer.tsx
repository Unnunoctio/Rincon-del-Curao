import { FooterScrollTop } from '@/components/layout/footer-scroll-top'
import { Logo } from '@/components/ui/logo'
import '@/styles/globals.css'
import { INFO_ROUTES, ROUTES } from '@/utils/router-paths'
import Link from 'next/link'
import { JSX } from 'react'

export const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className='f-container'>
      <div className='footer'>
        <section className='f-content'>
          <div className='f-logo-container'>
            <Logo classNameBoxHeight='f-logo-box-height' classNameLogoWidth='f-logo-width' />
            <p className='f-logo-text'>
              Nuesta misión es ayudar a los consumidores a escoger las mejores bebidas disponibles en el mercado, para sus presupuestos.
            </p>
          </div>
          <div className='f-routes-container'>
            <section className='f-routes-section'>
              <h3>Centro de Ayuda</h3>
              <ul>
                {INFO_ROUTES.map((item, index) => (
                  <li key={index}>
                    <Link href={item.route} className='f-route-item'>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className='f-routes-section f-routes-hidden'>
              <h3>Navegación</h3>
              <ul>
                {ROUTES.map((item, index) => (
                  <li key={index}>
                    <Link href={item.route} className='f-route-item'>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <FooterScrollTop />
          </div>
        </section>
        <hr className='f-divider' />
        <span className='f-year-text'>&copy; {new Date().getFullYear()} Rincón del Curao. Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}
