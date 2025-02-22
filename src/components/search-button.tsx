'use client'

import { SearchIcon } from "@/icons/search"
import { useUI } from "@/providers/ui-provider"

export const SearchButton = () => {
  const { isNavbarOpen, toogleNavbar } = useUI()

  return (
    <button
      onClick={toogleNavbar}
      className="group flex items-center p-1.5 w-fit h-fit cursor-pointer"
      aria-current={isNavbarOpen}
      aria-label="Abrir o cerrar búscador"
    >
      <SearchIcon className="stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" />
    </button>
  )
}
