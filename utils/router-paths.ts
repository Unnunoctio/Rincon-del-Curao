
export const ROUTES = [
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

export const INFO_ROUTES = [
  {
    name: 'Términos y Condiciones',
    route: '/informacion-legal/terminos-y-condiciones'
  },
  {
    name: 'Política de Privacidad',
    route: '/informacion-legal/politica-de-privacidad'
  },
  {
    name: 'Contacto',
    route: '/contacto'
  }
]
