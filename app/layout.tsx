import '@/styles/global.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@/lib/provider/theme-provider'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { ProgressProvider } from '@/lib/provider/progress-provider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Rincón del Curao',
  description: 'Recopilador de precios de distintos alcoholes vendidos en chile.'
}

interface RootLayoutProps {
  children: JSX.Element
}

export default function RootLayout ({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='es'>
      <body className={`${roboto.className} bg-page`}>
        <ProgressProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Navigation />
            <div className='h-[72px]' />
            <main className='flex justify-center w-full'>
              <div className='px-2 sm:px-8 md:px-13 py-2 md:py-4 min-h-page-container max-w-page-container w-full'>
                {children}
              </div>
            </main>
            <Footer />
          </ThemeProvider>
        </ProgressProvider>
      </body>
    </html>
  )
}
