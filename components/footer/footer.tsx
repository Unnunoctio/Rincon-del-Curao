import { Logo } from '../logo'
import { FooterNavigation } from './footer-navigation'
import { ScrollTopButton } from './scroll-top-button'

export const Footer: React.FC = () => {
  return (
    <footer className='flex justify-center py-8 mt-15 w-full bg-primary border-t divider-primary'>
      <div className='flex flex-col px-4 md:px-8 max-w-nav-container w-full'>
        <div className='flex justify-between'>
          <div className='flex flex-col items-center sm:items-start gap-2 max-w-full sm:max-w-[300px]'>
            <Logo width={120} height={40} boxHeight={60} className='transition-transform hover:scale-105' />
            <p className='italic text-center sm:text-left text-primary'>
              Nuestra misión es ayudar a los consumidores a escoger las mejores bebidas para sus presupuestos.
            </p>
          </div>

          <div className='relative flex align-start gap-8'>
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
