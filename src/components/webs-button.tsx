'use client'

import { StoreIcon } from "@/icons/store"
import { useUIStore } from "@/store/ui-store"

export const WebsButton = () => {
  const { isWebsModalOpen, openWebsModal } = useUIStore((state) => state)

  return (
    <button
      onClick={openWebsModal}
      className="group flex items-center gap-3 p-1 xl:p-2 w-fit h-fit cursor-pointer"
      aria-current={isWebsModalOpen}
    >
      <StoreIcon className="stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-8 xl:w-7 h-8 xl:h-7" />
      <span className="group-aria-current:text-c-snow-white group-hover:text-c-snow-white hidden xl:block font-medium text-[18px] text-c-steel-gray">
        Tiendas
      </span>
    </button>
  )
}
