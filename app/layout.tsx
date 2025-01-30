import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Roboto } from 'next/font/google'
import { JSX } from 'react'
import './globals.css'

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
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {/* NAVBAR */}
          {/* SIDEBAR */}
          <div className='n-space' />
          <main className='p-container'>
            <section className='page'>
              {children}
            </section>
          </main>
          {/* FOOTER */}
        </ThemeProvider>
      </body>
    </html>
  )
}
