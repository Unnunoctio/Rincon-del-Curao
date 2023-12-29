import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductTitle } from '@/lib/api'

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
  return (
    <>
      <h1>{params.path}</h1>
    </>
  )
}
