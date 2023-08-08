import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/products'

const pathValids = ['cervezas', 'vinos', 'destilados']

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
