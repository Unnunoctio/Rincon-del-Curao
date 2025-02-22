import { MenuButton } from "@/components/menu-button"
import { Search } from "@/components/search"
import { WebsButton } from "@/components/webs-button"
import { Logo } from "@/icons/logo"
import { Suspense } from "react"


export const Navbar = () => {
  return (
    <>
      <div className="xl:hidden h-[68px]" />

      <nav className="xl:hidden fixed flex justify-between bg-c-onix-black px-7 py-3 w-full">
        <a href="/" className="group w-fit" aria-label="Ir al inicio">
          <Logo className="w-[147px] h-[44px] group-hover:scale-105 transition-[scale] duration-300" />
        </a>
        <Suspense>
          <section className="flex items-center gap-6">
            <Search />
            <WebsButton />
            <MenuButton />
          </section>
        </Suspense>
      </nav>
    </>
  )
}
