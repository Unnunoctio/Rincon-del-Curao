import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404'
}

export default function NotFound (): JSX.Element {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <span className='pb-1 text-2xl font-medium text-active'>Error 404</span>
          <h2 className='text-4xl font-bold text-primary'>La página que buscas no existe</h2>
          <p className='text-primary'>Este contenido no existe o fue removido.</p>
        </div>
        <Link
          href='/'
          aria-label='ir al home'
          className='px-4 py-2 w-fit font-medium text-primary text-hover rounded-md border border-primary border-hover transition-colors'
        >
          Ir al Home
        </Link>
      </div>
    </div>
  )
}
