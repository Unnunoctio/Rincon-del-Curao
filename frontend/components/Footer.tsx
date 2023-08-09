import Image from 'next/image'
import Link from 'next/link'
import { ScrollTopButton } from '.'
import { navigateLinks } from '@/helpers/pathsHelper'

export const Footer = (): React.ReactNode => {
  return (
    <footer className='flex justify-center py-8 mt-15 w-full bg-primary border-t divider-primary'>
      <div className='flex flex-col px-4 md:px-8 max-w-nav-container w-full'>
        <div className='flex justify-between'>
          <div className='flex flex-col items-center sm:items-start gap-2 max-w-full sm:max-w-[300px]'>
            <div className='flex items-center h-[60px]'>
              <Link href='/' className='transition-transform hover:scale-105'>
                <Image src='/Logo.png' alt='Logo' width={120} height={38} />
              </Link>
            </div>
            <p className='italic text-center sm:text-left text-primary'>
              Nuestra misión es ayudar a los consumidores a escoger las mejores bebidas para sus presupuestos.
            </p>
          </div>

          <div className='relative flex align-start gap-8'>
            <div className='hidden md:block'>
              <h6 className='text-[18px] font-medium text-primary'>Navegación</h6>
              <ul className='flex flex-col gap-3 mt-3'>
                {navigateLinks.map((link) => (
                  <li key={link.route}>
                    <Link href={link.route} className='w-fit text-secondary hover:underline'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ScrollTopButton />
          </div>
        </div>
        <hr className='my-6 divider-primary' />
        <p className='text-center'>&copy; {new Date().getFullYear()} Rincón del Curao. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
