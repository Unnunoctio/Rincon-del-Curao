import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { ThemeProvider } from '@/lib/provider/theme-provider'
import { Footer } from '@/components/footer'
import NextTopLoader from 'nextjs-toploader'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: {
    default: 'Rincón del Curao',
    template: '%s • Rincón del Curao'
  },
  description: 'Recopilador de precios de distintos alcoholes vendidos en Chile.'
}

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='es'>
      <body className={`${roboto.className} bg-page`}>
        <NextTopLoader color='#d69e2e' showSpinner={false} />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navigation />
          <div className='h-[72px]' />
          <main className='flex justify-center w-full'>
            <section className='px-2 sm:px-8 md:px-12 py-2 sm:py-4 min-h-page-container max-w-page-container w-full'>
              {children}
            </section>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
