import { ScrollTop } from "@/components/scroll-top";
import { INFO_ROUTES } from "@/config/router-paths";
import { Logo } from "@/icons/logo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-6 px-4 py-6">
      <section className="relative flex sm:flex-row flex-col justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-6 sm:gap-3">
          <Link href="/" className="group" aria-label="Ir al inicio">
            <Logo className="w-[133px] h-[40px] group-hover:scale-105 transition-[scale] duration-300" />
          </Link>
          <p className="sm:max-w-[260px] text-center sm:text-start italic text-balance">
            Nuestra misión es ayudar a los consumidores a escoger las mejores bebidas disponibles en el mercado, para sus presupuestos.
          </p>
        </div>
        <div className="flex justify-center sm:justify-start gap-10">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <p className="w-fit font-medium text-[18px]">Centro de Ayuda</p>
            {
              INFO_ROUTES.map((route, index) => (
                <Link href={route.route} key={index} className="w-fit text-c-steel-gray hover:text-c-snow-white cursor-pointer">
                  {route.name}
                </Link>
              ))
            }
          </div>
          <ScrollTop />
        </div>
      </section>
      <hr className="border-c-steel-gray" />
      <section className="flex justify-between">
        <div>
          {/* THEME */}
        </div>
        <span className="inline-block">© 2025 Rincón del Curao.<span className="hidden sm:inline-block">&nbsp;Todos los derechos reservados.</span></span>
      </section>
    </footer>
  )
}
