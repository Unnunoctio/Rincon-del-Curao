import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from './theme-provider'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

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
    <html lang='en'>
      <body className={roboto.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ThemeSwitcher />
          <main className='min-h-screen bg-page'>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
