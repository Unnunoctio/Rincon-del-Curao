import { Metadata } from "next";

interface Props {
  searchParams: {
    q: string
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = searchParams

  return {
    title: `${q} • Búsqueda`
  }
}

export default function Search({ searchParams }: Props) {
  return (
    <>
      <h1 className="text-3xl">BUSCAR: {searchParams.q}</h1>
    </>
  )
}
