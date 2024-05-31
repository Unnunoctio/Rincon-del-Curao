import '@/styles/globals.css'
import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { Roboto } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import NextTopLoader from 'nextjs-toploader'
import { ThemeProvider } from '@/provider/theme-provider'
import { getAllWebs } from '@/lib/api'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: {
    default: 'Rincón del Curao',
    template: '%s • Rincón del Curao'
  },
  description: 'Recopilador de precios de distintos alcoholes vendidos en Chile.'
}

export default async function RootLayout ({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const webs = await getAllWebs()

  return (
    <html lang='es'>
      <body className={`${roboto.variable} bg-page font-roboto`}>
        <NextTopLoader color='#d69e2e' showSpinner={false} />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ToastContainer containerId='notification' position='top-right' />
          <Navigation webs={webs} />
          <div className='h-[72px]' />
          <main className='flex justify-center w-full'>
            <section className='px-2 sm:px-8 md:px-12 py-2 sm:py-4 min-h-page-container max-w-page-container w-full'>
              {children}
            </section>
          </main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
