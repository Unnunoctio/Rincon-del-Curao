import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getNavigateLink, isValidNavigateLink } from '@/helpers/pathsHelper'

export function generateMetadata ({ params }: { params: { category: string } }): Metadata {
  const { category } = params
  const navigateLink = getNavigateLink(`/${category}`)

  if (navigateLink !== undefined) {
    return {
      title: `${navigateLink.name} | Rincón del Curao`
    }
  }
  return {}
}

export default function ProductsLayout ({ children, params }: { children: React.ReactNode, params: { category: string } }): React.ReactNode {
  const { category } = params
  if (!isValidNavigateLink(`/${category}`)) {
    notFound()
  }

  return (
    <>
      {children}
    </>
  )
}
