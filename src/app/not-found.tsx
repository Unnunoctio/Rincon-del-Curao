import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Página no encontrada",
}

export default function NotFound() {
  return (
    <>
      <h1 className="text-3xl">404 - NOT FOUND</h1>
    </>
  )
}
