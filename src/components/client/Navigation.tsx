import { ROUTES } from "@/config/router-paths";
import { BeerIcon } from "@/icons/client/BeerIcon";
import { ChevronIcon } from "@/icons/client/ChevronIcon";
import { SpiritIcon } from "@/icons/client/SpiritIcon";
import { WineIcon } from "@/icons/client/WineIcon";
import { useUIStore } from "@/store/ui-store";
import { useEffect, useState } from "react";

interface Props {
  routeModule: {
    route: string
    category: string | undefined
  } | undefined
}

export const Navigation: React.FC<Props> = ({ routeModule }) => {
  const { sidebarSection, toggleSidebarSection } = useUIStore((state) => state)
  const [shouldTransition, setShouldTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => setShouldTransition(true), 50);
  }, []);

  return (
    <ul className="flex flex-col gap-3 text-c-steel-gray">
      {
        ROUTES.map((route, index) => (
          <li key={index} className={`group h-[44px] aria-current:h-[228px] overflow-hidden ${ shouldTransition ? "transition-[height]" : "" }`} aria-current={sidebarSection === route.section}>
            <button
              onClick={() => toggleSidebarSection(route.section)}
              className="flex justify-between items-center gap-3 p-2 w-full cursor-pointer"
            >
              { route.icon === 'beer-icon' && <BeerIcon className="group-aria-current:fill-c-snow-white group-hover:fill-c-snow-white fill-c-steel-gray stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" /> }
              { route.icon === 'wine-icon' && <WineIcon className="group-aria-current:fill-c-snow-white group-hover:fill-c-snow-white fill-c-steel-gray stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" /> }
              { route.icon === 'distillates-icon' && <SpiritIcon className="group-aria-current:fill-c-snow-white group-hover:fill-c-snow-white fill-c-steel-gray stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" /> }
              <span className={`group-aria-current:text-c-snow-white group-hover:text-c-snow-white flex-1 font-medium text-[18px] text-start`}>{route.name}</span>
              <ChevronIcon className={`stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-5 h-5 group-aria-current:rotate-90 ${ shouldTransition ? "transition-[rotate]" : "" }`} />
            </button>

            <ul className="group-aria-current:flex hidden flex-col gap-1.5 ml-5 border-c-steel-gray border-l aria-">
              {
                route.categories.map((category, index) => (
                  <li key={index} className="-ml-px">
                    <a href={`/${route.route}?sub_category=${category.query}`} className={`py-1 pl-4 pr-2 border-l flex w-fit cursor-pointer ${ routeModule?.route === route.route && routeModule?.category === category.query ? "text-c-old-gold border-c-old-gold" : "border-c-steel-gray hover:text-c-snow-white hover:border-c-snow-white" }`}>{category.name}</a>
                  </li>
                ))
              }
              <li className="-ml-px">
                <a href={`/${route.route}`} className={`py-1 pl-4 pr-2 border-l flex w-fit cursor-pointer ${ routeModule?.route === route.route && routeModule?.category === undefined ? "text-c-old-gold border-c-old-gold" : "border-c-steel-gray hover:text-c-snow-white hover:border-c-snow-white" }`}>Ver Todos</a>
              </li>
            </ul>
          </li>
        ))
      }
    </ul>
  )
}