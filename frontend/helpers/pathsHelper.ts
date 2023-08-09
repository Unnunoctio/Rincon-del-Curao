import { PathLink, PathLinkAll, Route } from './types'

export const navigateLinks: PathLinkAll[] = [
  {
    name: 'Cervezas',
    route: '/cervezas',
    categories: [
      { name: 'Cervezas Artesanales', query: 'Cervezas Artesanales' },
      { name: 'Cervezas Tradicionales', query: 'Cervezas Tradicionales' },
      { name: 'Cervezas Importadas', query: 'Cervezas Importadas' },
      { name: 'Cervezas Sin Alcohol', query: 'Cervezas Sin Alcohol' }
    ]
  },
  {
    name: 'Vinos',
    route: '/vinos',
    categories: [
      { name: 'Vinos Tintos', query: 'Vinos Tintos' },
      { name: 'Vinos Blancos', query: 'Vinos Blancos' },
      { name: 'Vinos Rosé', query: 'Vinos Rose' },
      { name: 'Vinos Cero', query: 'Vinos Cero' }
    ]
  },
  {
    name: 'Destilados',
    route: '/destilados',
    categories: [
      { name: 'Ron', query: 'Ron' },
      { name: 'Pisco', query: 'Pisco' },
      { name: 'Vodka', query: 'Vodka' },
      { name: 'Whisky', query: 'Whisky' }
    ]
  }
]

export const getNavigateLink = (link: Route): PathLink | undefined => {
  return navigateLinks.find(l => l.route === link)
}

export const isValidNavigateLink = (link: Route): boolean => {
  if (navigateLinks.find(l => l.route === link) == null) return false
  return true
}
