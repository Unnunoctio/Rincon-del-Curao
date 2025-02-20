import { ArrowUpIcon } from "@/icons/client/ArrowUpIcon";

export const ScrollTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      className="group top-0 right-0 sm:static absolute hover:bg-c-lead-gray p-2 rounded-full w-fit h-fit cursor-pointer"
      aria-label="Ir al inicio de la página"
    >
      <ArrowUpIcon className="stroke-c-steel-gray group-hover:stroke-c-snow-white" />
    </button>
  )
}
