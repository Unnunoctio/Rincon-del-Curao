'use client'

import { WebCheckbox } from "@/components/web-checkbox";
import { useCookies } from "@/providers/cookies-provider";
import { useUI } from "@/providers/ui-provider";
import { useWebs } from "@/providers/webs-provider";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Cookies from "js-cookie";
import { Slide, toast } from "react-toastify";

export const WebsModal = () => {
  const { webs } = useWebs()
  const { selectedWebs, setSelectedWebs } = useCookies()
  const { isWebsModalOpen, closeWebsModal } = useUI()

  const successNotify = (): any => toast.success('Tiendas guardadas', {
    containerId: 'notification',
    theme: 'colored',
    transition: Slide
  })

  const errorNotify = (): any => toast.error('Debes seleccionar al menos una tienda', {
    containerId: 'notification',
    theme: 'colored',
    transition: Slide
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPrefersWebs = new FormData(e.target as HTMLFormElement).getAll("prefer-web")
    if (newPrefersWebs.length > 0) {
      Cookies.set('selectedWebs', newPrefersWebs.join(','))
      setSelectedWebs(newPrefersWebs as string[])
      successNotify()
      closeWebsModal()
    } else {
      errorNotify()
    }
  }

  return (
    <Dialog as="div" open={isWebsModalOpen} onClose={closeWebsModal} className="z-50 relative">
      <DialogBackdrop transition className="fixed inset-0 bg-black/40 data-[closed]:opacity-0 transition-opacity duration-300 ease-in-out" />
      <div className="fixed inset-0">
        <form onSubmit={onSubmit} className="flex justify-center items-center p-4 min-h-full">
          <DialogPanel transition className="flex flex-col gap-4 bg-c-onix-black data-[closed]:opacity-0 shadow-xl p-4 rounded-xl w-full max-w-6xl overflow-hidden text-left align-middle transition-opacity duration-300 ease-in-out">
            <DialogTitle as="h3" className="px-3 w-fit font-medium text-[20px]">
              Tiendas
            </DialogTitle>
            <hr className="border-c-steel-gray" />
            <ul className="flex flex-wrap content-start gap-3 min-h-[50vh] max-h-[65vh] overflow-y-auto">
              {webs.map((web, index) => (
                <li key={index} className="w-full max-w-[200px]">
                  <WebCheckbox value={web.code} label={web.name} checked={selectedWebs.includes(web.code) || selectedWebs.length === 0} />
                </li>
              ))}
            </ul>
            <hr className="border-c-steel-gray" />
            <section className="flex justify-end gap-4 px-3">
              <button
                onClick={closeWebsModal}
                className="hover:bg-c-lead-gray px-3 py-1.5 rounded-full font-medium text-c-old-gold cursor-pointer"
                type="button"
              >
                Cancelar
              </button>
              <button
                className="bg-c-old-gold hover:bg-c-old-gold/80 px-3 py-1.5 rounded-full font-medium text-c-snow-white cursor-pointer"
                type="submit"
              >
                Guardar
              </button>
            </section>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  )
}
