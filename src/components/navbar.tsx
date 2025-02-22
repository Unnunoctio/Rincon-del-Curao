'use client'

import { MenuButton } from "@/components/menu-button"
import { Search } from "@/components/search"
import { SearchButton } from "@/components/search-button"
import { WebsButton } from "@/components/webs-button"
import { Logo } from "@/icons/logo"
import { LogoCompressed } from "@/icons/logo-compressed"
import { useUI } from "@/providers/ui-provider"

export const Navbar = () => {
  const { isNavbarOpen } = useUI()

  return (
    <>
      <div className="hidden xl:hidden sm:block h-[68px]" />
      <div className={`block sm:hidden ${ isNavbarOpen ? "h-[122px]" : "h-[68px]"}`} />

      <nav className="xl:hidden fixed gap-y-3 grid grid-cols-3 bg-c-onix-black px-4 sm:px-7 py-3 w-full">
        <div className="flex justify-start">
          <a href="/" className="group w-fit" aria-label="Ir al inicio">
            <Logo className="hidden xs:block w-[147px] h-[44px] group-hover:scale-105 transition-[scale] duration-300" />
            <LogoCompressed className="xs:hidden block w-11 h-11 group-hover:scale-105 transition-[scale] duration-300" />
          </a>
        </div>
        <div className="flex justify-end items-center gap-4 col-span-2">
          <div className="hidden sm:block">
            <Search />
          </div>
          <div className="sm:hidden">
            <SearchButton />
          </div>
          <WebsButton />
          <MenuButton />
        </div>
        { isNavbarOpen &&
          <div className="sm:hidden col-span-3">
            <Search />
          </div>
        }
      </nav>
    </>
  )
}
