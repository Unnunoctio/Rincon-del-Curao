import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductTitle } from '@/lib/api'
import { createBreadcrumbLinks } from '@/helpers/path'
import { Breadcrumb } from '@/components/breadcrumb'

interface Props {
  params: { path: string }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const isProduct = await getProductTitle(params.path)
  if (!isProduct.isExist) return notFound()

  return {
    title: isProduct.title
  }
}

export default async function ProductPage ({ params }: Props): Promise<JSX.Element> {
  const title = 'Este es un buen producto xd'

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', 'Cervezas', title])} />
      <h1>{params.path}</h1>
    </>
  )
}
