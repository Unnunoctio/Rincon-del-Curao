'use client'

import { Logo } from "@/icons/logo"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Navigation } from "./navigation"

export const Sidebar = () => {
  const params = useParams<{ category: string }>()
  const searchParams = useSearchParams()

  const { category } = params
  const subCategories = searchParams.getAll("sub_category")

  return (
    <section className="hidden xl:block">
      <aside className="top-0 left-0 sticky flex flex-col gap-10 py-6 pr-3 pl-6 w-[280px]">
        <Link href="/" className="group w-fit" aria-label="Ir al inicio">
          <Logo className="w-[147px] h-[44px] group-hover:scale-105 transition-[scale] duration-300" />
        </Link>
        {/* SEARCH */}
        <section className="flex flex-col gap-3">
          <Navigation routeModule={category ? { route: category, query: subCategories.length === 1 ? subCategories[0] : undefined } : undefined} />
          <hr className="border-c-steel-gray" />
          {/* WEBS MODAL */}
        </section>
      </aside>
    </section>
  )
}
