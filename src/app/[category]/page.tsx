import { ROUTES } from "@/config/router-paths"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return ROUTES.map((route) => ({
    category: route.route
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { category } = params

  const route = ROUTES.find((route) => route.route === category)
  if (!route) return notFound()

  return {
    title: route?.name
  }
}

export default function Category({ params }: { params: { category: string } }) {
  return (
    <>
      <h1 className="text-3xl">CATEGORIA {params.category}</h1>
    </>
  )
}
