import { BreadcrumbLink } from "@/types"

export const ROUTES = [
  {
    name: 'Cervezas',
    route: 'beers',
    icon: 'beer-icon',
    section: 'beers',
    queries: [
      { name: 'Cervezas Artesanales', query: 'Cervezas Artesanales' },
      { name: 'Cervezas Tradicionales', query: 'Cervezas Tradicionales' },
      { name: 'Cervezas Importadas', query: 'Cervezas Importadas' },
      { name: 'Cervezas Sin Alcohol', query: 'Cervezas Sin Alcohol' }
    ]
  },
  {
    name: 'Vinos',
    route: 'wines',
    icon: 'wine-icon',
    section: 'wines',
    queries: [
      { name: 'Vinos Tintos', query: 'Vinos Tintos' },
      { name: 'Vinos Blancos', query: 'Vinos Blancos' },
      { name: 'Vinos Rosé', query: 'Vinos Rose' },
      { name: 'Vinos Cero', query: 'Vinos Cero' }
    ]
  },
  {
    name: 'Destilados',
    route: 'distillates',
    icon: 'distillate-icon',
    section: 'distillates',
    queries: [
      { name: 'Ron', query: 'Ron' },
      { name: 'Pisco', query: 'Pisco' },
      { name: 'Vodka', query: 'Vodka' },
      { name: 'Whisky', query: 'Whisky' }
    ]
  }
]

export const INFO_ROUTES = [
  {
    name: 'Términos y Condiciones',
    route: '/terms'
  },
  {
    name: 'Política de Privacidad',
    route: '/privacy'
  },
  {
    name: 'Contacto',
    route: '/contact'
  }
]

export const createBreadcrumb = (titles: string[]): BreadcrumbLink[] => {
  return titles.map(title => {
    if (title === 'Home') return { name: 'Inicio', href: '/' }

    const link = ROUTES.find(route => route.name === title)
    if (link !== undefined) return { name: link.name, href: `/${link.route}` }

    return { name: title, href: '/#' }
  })
}
