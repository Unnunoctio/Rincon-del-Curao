import { AppFooter } from '@/components/app-footer'
import { AppNavbar } from '@/components/app-navbar'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StoresProvider } from '@/providers/stores-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: {
        default: 'Rincón del Curao',
        template: '%s • Rincón del Curao',
    },
    description: 'Recopilador de precios de distintas bebidas alcohólicas, vendidas en Chile',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
            <body className="min-h-dvh antialiased">
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <TooltipProvider>
                        <StoresProvider>
                            <SidebarProvider>
                                <AppSidebar />
                                <SidebarInset>
                                    <AppNavbar />
                                    <main className="flex flex-col flex-1 gap-3 p-3 pt-0 xl:pt-3 xl:pl-1">
                                        <section className="flex flex-col flex-1 rounded-2xl bg-sidebar p-6 min-h-[calc(100svh-3.5rem-1.5rem)] xl:min-h-[calc(100svh-1.5rem)]">
                                            {children}
                                        </section>
                                        <AppFooter />
                                    </main>
                                </SidebarInset>
                            </SidebarProvider>
                        </StoresProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
