import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { AmplifyProvider } from '@/providers/amplify-provider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Roboto } from 'next/font/google'
import { JSX } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: {
    default: 'Rincón del Curao',
    template: '%s - Rincón del Curao'
  },
  description: 'Recopilador de precios de distintas bebidas alcohólicas, vendidas en Chile'
}

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`${roboto.variable}`}>
        <AmplifyProvider />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ToastContainer containerId='notification' position='top-right' autoClose={2000} />
          <Navbar />
          {/* SIDEBAR */}
          <div className='n-space' />
          <main className='p-container'>
            <section className='page'>
              {children}
            </section>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
