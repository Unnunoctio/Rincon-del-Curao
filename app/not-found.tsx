import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404'
}

export default function NotFound (): JSX.Element {
  return (
    <div className='layout-notfound'>
      <div className='notfound-container'>
        <section className='notfound-section'>
          <span className='notfound-span'>Error 404</span>
          <h1 className='notfound-title'>La página que buscas no existe</h1>
          <p>Este contenido no existe o fue removido.</p>
        </section>
        <Link
          href='/'
          aria-label='ir al home'
          className='notfound-button'
        >
          Ir al Home
        </Link>
      </div>
    </div>
  )
}
