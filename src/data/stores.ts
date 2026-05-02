import type { StoreInfo } from '@/types'

/** Simula el estado inicial del backend — pocas tiendas registradas */
export const MOCK_STORES_INITIAL: StoreInfo[] = [
    { code: 'jumbo', name: 'Jumbo' },
    { code: 'lider', name: 'Líder' },
    { code: 'unimarc', name: 'Unimarc' },
    { code: 'santa-isabel', name: 'Santa Isabel' },
    { code: 'walmart', name: 'Walmart' },
]

/** Simula el backend luego de agregar tiendas nuevas */
export const MOCK_STORES_FULL: StoreInfo[] = [
    { code: 'jumbo', name: 'Jumbo' },
    { code: 'lider', name: 'Líder' },
    { code: 'unimarc', name: 'Unimarc' },
    { code: 'santa-isabel', name: 'Santa Isabel' },
    { code: 'tottus', name: 'Tottus' },
    { code: 'walmart', name: 'Walmart' },
    { code: 'cornershop', name: 'Cornershop' },
    { code: 'rappi', name: 'Rappi' },
    { code: 'mundo-del-vino', name: 'El Mundo del Vino' },
    { code: 'vinoteca', name: 'Vinoteca' },
    { code: 'botilleria-ok', name: 'Botillería OK' },
    { code: 'super-bodega', name: 'Super Bodega a cta.' },
]
