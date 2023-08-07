'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider ({ children, ...props }: ThemeProviderProps): React.ReactNode {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
