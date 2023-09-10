import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from './theme-provider'
import { Footer } from '@/components/footer/Footer'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Rincón del Curao',
  description: 'Recopilador de precios de distintos alcoholes vendidos en chile.'
}

export default function RootLayout ({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang='es'>
      <body className={`${roboto.className} bg-page`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {/* Navigator */}
          <div className='h-[72px]' />
          <main className='flex justify-center w-full'>
            <div className='px-2 sm:px-8 md:px-13 py-2 md:py-4 min-h-page-container max-w-page-container w-full'>
              {children}
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
