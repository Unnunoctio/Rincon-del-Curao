import type { WebInfo } from "@/graphql/types";
import { StoreIcon } from "@/icons/client/StoreIcon";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { WebCheckbox } from "./WebCheckbox";

interface Props {
  allWebs: WebInfo[]
}

export const WebInfoModal: React.FC<Props> = ({ allWebs }) => {
  const [prefersWebs, setPreferesWebs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const newPrefersWebs = new FormData(e.target as HTMLFormElement).getAll("prefer-web");
    // if (newPrefersWebs.length > 0) {
    //   Cookies.set("prefersWebs", newPrefersWebs.join(","), { expires: 365, sameSite: "strict" });
    //   setPreferesWebs(newPrefersWebs as string[]);
    //   successNotify();
    //   closeModal();
    // } else {
    //   errorNotify();
    // }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="group flex items-center gap-3 p-1 xl:p-2 w-fit h-fit cursor-pointer"
        aria-current={isOpen}
      >
        <StoreIcon className="stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-8 xl:w-7 h-8 xl:h-7" />
        <span className="group-aria-current:text-c-snow-white group-hover:text-c-snow-white hidden xl:block font-medium text-[18px] text-c-steel-gray">
          Tiendas
        </span>
      </button>

      <Dialog as="div" open={isOpen} onClose={closeModal} className="z-50 relative">
        <DialogBackdrop transition className="fixed inset-0 bg-black/40 data-[closed]:opacity-0 transition-opacity duration-300 ease-in-out" />
        <div className="fixed inset-0">
          <form onSubmit={onSubmit} className="flex justify-center items-center p-4 min-h-full">
            <DialogPanel transition className="flex flex-col gap-4 bg-c-onix-black data-[closed]:opacity-0 shadow-xl p-4 rounded-xl w-full max-w-6xl overflow-hidden text-left align-middle transition-opacity duration-300 ease-in-out">
              <DialogTitle as="h3" className="px-3 w-fit font-medium text-[20px]">
                Tiendas
              </DialogTitle>
              <hr className="border-c-steel-gray" />
              <ul className="flex flex-wrap content-start gap-3 min-h-[50vh] max-h-[65vh] overflow-y-auto">
                {allWebs.map((web, index) => (
                  <li key={index} className="w-full max-w-[200px]">
                    <WebCheckbox value={web.code} label={web.name} checked={prefersWebs.includes(web.code) || prefersWebs.length === 0} />
                  </li>
                ))}
              </ul>
              <hr className="border-c-steel-gray" />
              <section className="flex justify-end gap-4 px-3">
                <button
                  onClick={closeModal}
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
    </>
  )
}