import { NotFoundIcon } from "@/icons/not-found"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Página no encontrada",
}

export default function NotFoundPage() {
  return (
    <div className="flex sm:flex-row flex-col-reverse justify-center items-center gap-x-8 gap-y-6">
      <NotFoundIcon className="hidden sm:block w-[196px] h-[196px]" />
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-[36px]">Oops!</h1>
        <p className="max-w-[260px] text-[20px] text-c-silver-gray">El contenido que buscas no existe o fue removido.</p>
        <Link href="/" className="mt-1 px-4 py-2 border border-c-silver-gray hover:border-c-snow-white rounded-full w-fit font-medium text-[16px] text-c-silver-gray hover:text-c-snow-white">Ir al inicio</Link>
      </div>
    </div>
  )
}
