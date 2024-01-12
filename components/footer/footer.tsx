import { Logo } from '../logo'
import { FooterInfo } from './footer-info'
import { FooterNavigation } from './footer-navigation'
import { ScrollTopButton } from './scroll-top-button'

export const Footer: React.FC = () => {
  return (
    <footer className='flex justify-center py-8 mt-15 w-full bg-primary border-t divider-primary'>
      <div className='flex flex-col px-4 md:px-8 max-w-nav-container w-full'>
        <div className='relative flex flex-col gap-4 sm:flex-row justify-between'>
          <div className='flex flex-col items-center sm:items-start gap-2 max-w-full sm:max-w-[300px]'>
            <Logo boxHeight='h-[60px]' logoWidth='w-[120px]' linkClass='transition-transform hover:scale-105' />
            <p className='italic text-center sm:text-left text-primary'>
              Nuestra misión es ayudar a los consumidores a escoger las mejores bebidas para sus presupuestos.
            </p>
          </div>

          <div className='flex justify-center gap-8'>
            <FooterInfo />
            <FooterNavigation />
            <ScrollTopButton />
          </div>
        </div>
        <hr className='my-6 divider-primary' />
        <p className='text-center text-primary'>&copy; {new Date().getFullYear()} Rincón del Curao. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
