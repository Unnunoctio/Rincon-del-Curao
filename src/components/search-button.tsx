'use client'

import { SearchIcon } from "@/icons/search"
import { useUIStore } from "@/store/ui-store"

export const SearchButton = () => {
  const { isNavbarOpen, toogleNavbar } = useUIStore((state) => state)

  return (
    <button
      onClick={toogleNavbar}
      className="group flex items-center p-1.5 w-fit h-fit cursor-pointer"
      aria-current={isNavbarOpen}
    >
      <SearchIcon className="stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" />
    </button>
  )
}
