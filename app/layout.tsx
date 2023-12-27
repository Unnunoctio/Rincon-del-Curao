import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { ThemeProvider } from '@/lib/provider/theme-provider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500']
})

export const metadata: Metadata = {
  title: 'Rincón del Curao',
  description: 'Recopilador de precios de distintos alcoholes vendidos en Chile.'
}

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='es'>
      <body className={`${roboto.className} bg-page`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navigation />
          <div className='h-[72px]' />
          <main className='flex justify-center w-full'>
            <section className='px-2 sm:px-8 md:px-12 py-2 sm:py4 min-h-page-container max-w-page-container w-full'>
              {children}
            </section>
          </main>
          {/* Footer */}
        </ThemeProvider>
      </body>
    </html>
  )
}
