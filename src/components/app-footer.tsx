import { LogoFull } from '@/components/logo'
import { ScrollTop } from '@/components/scroll-top'
import { ThemeToggle } from '@/components/theme-toggle'
import { navInfo } from '@/config/nav'

export function AppFooter() {
    return (
        <footer className="flex flex-col gap-6 px-1 py-6">
            <section className="relative flex sm:flex-row flex-col justify-between gap-6">
                <div className="flex flex-col items-center sm:items-start gap-6 sm:gap-3">
                    <LogoFull className="h-8 text-primary" />
                    <p className="sm:max-w-65 text-center sm:text-start italic text-balance text-sm text-muted-foreground">
                        Nuestra misión es ayudar a los consumidores a escoger las mejores bebidas disponibles en el mercado, para sus presupuestos.
                    </p>
                </div>

                <div className="flex justify-center sm:justify-start gap-10">
                    <div className="flex flex-col items-center sm:items-start gap-3">
                        <p className="text-base font-medium">Centro de Ayuda</p>
                        {navInfo.map((link) => (
                            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <ScrollTop />
                </div>
            </section>

            <hr className="border-border" />

            <section className="flex justify-between items-center">
                <ThemeToggle />
                <span className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Rincón del Curao.
                    <span className="hidden sm:inline">&nbsp;Todos los derechos reservados.</span>
                </span>
            </section>
        </footer>
    )
}
