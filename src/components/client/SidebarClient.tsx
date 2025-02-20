import { Logo } from "@/components/client/Logo"
import { useUIStore } from "@/store/ui-store"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { Navigation } from "@/components/client/Navigation"
import { navigate } from "astro:transitions/client"
import { useEffect, useState } from "react"

interface Props {
  routeModule: {
    route: string
    category: string | undefined
  } | undefined
}

export const SidebarClient: React.FC<Props> = ({ routeModule }) => {
  const { isSidebarOpen, closeSidebar } = useUIStore((state) => state)
  const [shouldTransition, setShouldTransition] = useState(false);

  useEffect(() => {
    console.log('ENTRE')
    setTimeout(() => setShouldTransition(true), 500);
  }, []);

  return (
    <Dialog open={isSidebarOpen} onClose={closeSidebar} className="z-50 relative">
      <DialogBackdrop transition className={`fixed inset-0 bg-black/40 data-[closed]:opacity-0 ${ shouldTransition ? "transition-opacity duration-300 ease-in-out" : "" }`} />
      <section className="left-0 fixed inset-y-0 flex max-w-[292px] pointer-events-none">
        <DialogPanel transition className={`flex flex-col gap-15 bg-c-onix-black shadow-xl p-6 w-screen overflow-y-auto ${ shouldTransition ? "transition-transform duration-300 ease-in-out" : "" } data-[closed]:-translate-x-full pointer-events-auto transform`}>
          <DialogTitle className="flex justify-between items-center">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/')}}
              className="group w-fit cursor-pointer"
              aria-label="Ir al inicio"
            >
              <Logo className="w-[147px] h-[44px] group-hover:scale-105 transition-[scale] duration-300" />
            </a>
          </DialogTitle>
          <Navigation routeModule={routeModule} />
        </DialogPanel>
      </section>
    </Dialog>
  )
}
