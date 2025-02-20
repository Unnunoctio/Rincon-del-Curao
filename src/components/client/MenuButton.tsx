import { MenuIcon } from "@/icons/client/MenuIcon"
import { useUIStore } from "@/store/ui-store"


export const MenuButton = () => {
  const { isSidebarOpen, openSidebar } = useUIStore((state) => state)

  return (
    <button
      onClick={openSidebar}
      className="group flex items-center p-1 w-fit h-fit cursor-pointer"
      aria-current={isSidebarOpen}
    >
      <MenuIcon className="stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-8 h-8" />
    </button>
  )
}
