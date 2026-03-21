'use client'

import { LogoFull } from '@/components/logo'
import { SearchInput } from '@/components/search-input'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useStores } from '@/providers/stores-provider'
import { Menu, Search, Store, X } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

export function AppNavbar() {
    const { toggleSidebar } = useSidebar()
    const { open: openStores } = useStores()
    const [searchOpen, setSearchOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const openSearch = () => {
        setSearchOpen(true)
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const closeSearch = () => setSearchOpen(false)

    return (
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 xl:hidden">
            {/* Búsqueda expandida — solo xs */}
            {searchOpen && (
                <div className="flex w-full items-center gap-2 sm:hidden">
                    <SearchInput ref={inputRef} className="flex-1" onSearch={closeSearch} />
                    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={closeSearch} aria-label="Cerrar búsqueda">
                        <X />
                    </Button>
                </div>
            )}

            {/* Layout normal */}
            <div className={cn('flex w-full items-center justify-between', searchOpen && 'hidden sm:flex')}>
                {/* Izquierda: logo — full */}
                <Link href="/" aria-label="Inicio">
                    <LogoFull className="h-8 sm:h-9 text-primary" />
                </Link>

                {/* Derecha: search + botones */}
                <div className="flex items-center gap-2">
                    {/* sm+: input de búsqueda */}
                    <SearchInput className="hidden sm:block sm:max-w-64" />
                    {/* xs: icono búsqueda */}
                    <Button variant="ghost" size="icon" className="sm:hidden cursor-pointer" onClick={openSearch} aria-label="Buscar">
                        <Search />
                    </Button>
                    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={openStores} aria-label="Tiendas">
                        <Store />
                    </Button>
                    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={toggleSidebar} aria-label="Abrir menú">
                        <Menu />
                    </Button>
                </div>
            </div>
        </header>
    )
}
