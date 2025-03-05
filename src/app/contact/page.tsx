import { Breadcrumb } from "@/components/breadcrumb"
import { createBreadcrumb } from "@/config/router-paths"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto"
}

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-page-width">
      <Breadcrumb links={createBreadcrumb(['Home', 'Contacto'])} />
      <h1 className="font-medium text-3xl">Contacto</h1>
    </div>
  )
}
