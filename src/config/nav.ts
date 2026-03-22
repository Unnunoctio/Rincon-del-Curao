import { Beer, ChartBar, GlassWater, Home, Tag, Wine } from 'lucide-react'

export const navMain = [
    { title: 'Inicio', icon: Home, href: '/' },
    { title: 'Comparar precios', icon: ChartBar, href: '/compare' },
    { title: 'Ofertas', icon: Tag, href: '/deals' },
]

export const navCategories = [
    {
        title: 'Cervezas',
        icon: Beer,
        href: '/category/beers',
        items: [
            { title: 'Lager', href: '/category/beers/lager' },
            { title: 'Ale', href: '/category/beers/ale' },
            { title: 'IPA', href: '/category/beers/ipa' },
            { title: 'Sin alcohol', href: '/category/beers/non-alcoholic' },
            { title: 'Ver todas', href: '/category/beers' },
        ],
    },
    {
        title: 'Vinos',
        icon: Wine,
        href: '/category/wines',
        items: [
            { title: 'Tinto', href: '/category/wines/red' },
            { title: 'Blanco', href: '/category/wines/white' },
            { title: 'Rosé', href: '/category/wines/rose' },
            { title: 'Espumante', href: '/category/wines/sparkling' },
            { title: 'Ver todos', href: '/category/wines' },
        ],
    },
    {
        title: 'Destilados',
        icon: GlassWater,
        href: '/category/spirits',
        items: [
            { title: 'Whisky', href: '/category/spirits/whisky' },
            { title: 'Vodka', href: '/category/spirits/vodka' },
            { title: 'Ron', href: '/category/spirits/rum' },
            { title: 'Pisco', href: '/category/spirits/pisco' },
            { title: 'Ver todos', href: '/category/spirits' },
        ],
    },
]

export const navInfo = [
    { name: 'Términos y Condiciones', href: '/terms' },
    { name: 'Política de Privacidad', href: '/privacy' },
    { name: 'Contacto', href: '/contact' },
]
