import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/provider/theme-provider'
import { Navigation } from '@/components/navigation/navigation'
import { PageLayout } from '@/components/page-layout'
import { Footer } from '@/components/footer/footer'

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

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang='es'>
      <body className={`${roboto.variable} font-roboto bg-page`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navigation />
          <PageLayout>
            {children}
          </PageLayout>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
