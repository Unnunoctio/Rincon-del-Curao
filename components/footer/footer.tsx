import { Logo } from '../logo'

export const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <section className='footer-section'>
          <div className='footer-container-logo'>
            <Logo boxHeight='h-[60px' logoWidth='w-[120px]' linkClass='transition-transform hover:scale-105' />
            <p className='footer-text-logo'>
              Nuestra misión es ayudar a los consumidores a escoger las mejores bebidas para sus presupuestos.
            </p>
          </div>
          <div className='footer-container-items' />
        </section>
        <hr className='footer-divider' />
        <p className='footer-text-year'>&copy; {new Date().getFullYear()} Rincón del Curao. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
