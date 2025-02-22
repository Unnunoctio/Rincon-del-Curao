'use client'

import { Logo } from "@/icons/logo"
import { useUIStore } from "@/store/ui-store"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import Link from "next/link"
import { Navigation } from "./navigation"

export const SidebarMobile = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore((state) => state)

  return (
    <Dialog open={isSidebarOpen} onClose={closeSidebar} className="xl:hidden z-50 relative">
      <DialogBackdrop transition className="fixed inset-0 bg-black/40 data-[closed]:opacity-0 transition-opacity duration-300 ease-in-out" />
      <section className="left-0 fixed inset-y-0 flex max-w-[292px] pointer-events-none">
        <DialogPanel transition className="flex flex-col gap-15 bg-c-onix-black shadow-xl p-6 w-screen overflow-y-auto transition-transform data-[closed]:-translate-x-full duration-300 ease-in-out pointer-events-auto transform">
          <DialogTitle className="flex justify-between items-center">
            <Link href="/" className="group w-fit" aria-label="Ir al inicio">
              <Logo className="w-[147px] h-[44px] group-hover:scale-105 transition-[scale] duration-300" />
            </Link>
          </DialogTitle>
          <Navigation />
        </DialogPanel>
      </section>
    </Dialog>
  )
}
