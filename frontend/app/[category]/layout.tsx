import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/products'
import { Metadata } from 'next'

const pathValids = ['cervezas', 'vinos', 'destilados']
const categoryLinks = [
  { name: 'Cervezas', route: '/cervezas' },
  { name: 'Vinos', route: '/vinos' },
  { name: 'Destilados', route: '/destilados' }
]

export function generateMetadata ({ params }: { params: { category: string } }): Metadata {
  const category = categoryLinks.find(link => link.route === `/${params.category}`)

  if (category !== undefined) {
    return {
      title: `${category.name} | Rincón del Curao`
    }
  }
  return {}
}

export default function ProductsLayout ({ children, params }: { children: React.ReactNode, params: { category: string } }): React.ReactNode {
  const { category } = params
  if (!pathValids.includes(category)) {
    notFound()
  }

  return (
    <>
      <Breadcrumb />
      {children}
    </>
  )
}
