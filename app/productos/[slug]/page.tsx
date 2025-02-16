import { getIsSlugExistDB } from '@/dynamo/requests'
import { getProductDetail } from '@/graphql/requests'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JSX } from 'react'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata ({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const isSlug = await getIsSlugExistDB(slug)

  if (!isSlug.isExist) return notFound()

  return {
    title: isSlug.title,
    twitter: {
      title: isSlug.title
    },
    openGraph: {
      title: isSlug.title,
      url: `https://rincondelcurao.com/productos/${slug}`
    }
  }
}

export default async function Page ({ params }: Props): Promise<JSX.Element> {
  const slug = (await params).slug
  const productDetail = await getProductDetail(slug)

  console.log(productDetail)
  return (
    <>
      <h1>{slug}</h1>
    </>
  )
}
