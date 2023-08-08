import Link from 'next/link'

export default function NotFound (): React.ReactNode {
  return (
    <main className='flex items-center justify-center px-2 sm:px-4 md:px-8 min-h-page-container'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <span className='pb-1 text-2xl font-medium text-active'>Error 404</span>
          <h2 className='text-4xl font-bold text-primary'>La página que buscas no existe</h2>
          <p className='text-primary'>Este contenido no existe o fue removido.</p>
        </div>
        <Link
          href='/'
          className='px-4 py-2 w-fit font-medium text-primary text-hover rounded-md border border-primary border-hover transition-colors'
        >
          Ir al Home
        </Link>
      </div>
    </main>
  )
}
