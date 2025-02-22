import { Navigation } from "@/components/navigation"
import { Search } from "@/components/search"
import { WebsButton } from "@/components/webs-button"
import { Logo } from "@/icons/logo"
import Link from "next/link"

export const Sidebar = () => {
  return (
    <section className="hidden xl:block">
      <aside className="top-0 left-0 sticky flex flex-col gap-10 py-6 pr-3 pl-6 w-[280px]">
        <Link href="/" className="group w-fit" aria-label="Ir al inicio">
          <Logo className="w-[147px] h-[44px] group-hover:scale-105 transition-[scale] duration-300" />
        </Link>
        <Search />
        <section className="flex flex-col gap-3">
          <Navigation />
          <hr className="border-c-steel-gray" />
          <WebsButton />
        </section>
      </aside>
    </section>
  )
}
