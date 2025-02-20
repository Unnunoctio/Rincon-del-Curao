'use client'

import { ROUTES } from "@/config/router-paths"
import { BeerIcon } from "@/icons/beer"
import { ChevronRightIcon } from "@/icons/chevron-right"
import { DistillateIcon } from "@/icons/distillate"
import { WineIcon } from "@/icons/wine"
import Link from "next/link"
import { useState } from "react"

interface Props {
  routeModule: {
    route: string
    query: string | undefined
  } | undefined
}

export const Navigation = ({ routeModule }: Props) => {
  const [ sidebarSection, setSidebarSection ] = useState<string | undefined>(undefined)

  const toggleSidebarSection = (section: string) => {
    if (sidebarSection === section) setSidebarSection(undefined)
    else setSidebarSection(section)
  }

  return (
    <ul className="flex flex-col gap-3 text-c-steel-gray">
      {
        ROUTES.map((route, index) => (
          <li key={index} aria-current={sidebarSection === route.section} className="group h-[44px] aria-current:h-[228px] overflow-hidden transition-[height]">
            <button
              onClick={() => toggleSidebarSection(route.section)}
              className="flex justify-between items-center gap-3 p-2 w-full cursor-pointer"
            >
              { route.icon === 'beer-icon' && <BeerIcon className="group-aria-current:fill-c-snow-white group-hover:fill-c-snow-white fill-c-steel-gray stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" /> }
              { route.icon === 'wine-icon' && <WineIcon className="group-aria-current:fill-c-snow-white group-hover:fill-c-snow-white fill-c-steel-gray stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" /> }
              { route.icon === 'distillate-icon' && <DistillateIcon className="group-aria-current:fill-c-snow-white group-hover:fill-c-snow-white fill-c-steel-gray stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-7 h-7" /> }
              <span className="group-aria-current:text-c-snow-white group-hover:text-c-snow-white flex-1 text-[18px] text-start">{route.name}</span>
              <ChevronRightIcon className="stroke-c-steel-gray group-aria-current:stroke-c-snow-white group-hover:stroke-c-snow-white w-5 h-5 group-aria-current:rotate-90 transition-[rotate]" />
            </button>
            <ul className="group-aria-current:flex hidden flex-col gap-1.5 ml-5 border-c-steel-gray border-l">
              {
                route.queries.map((query, index) => (
                  <li key={index} className="-ml-px">
                    <Link href={`/${route.route}?sub_category=${query.query}`} className={`flex py-1 pr-2 pl-4 border-l w-fit cursor-pointer ${ routeModule?.route === route.route && routeModule?.query === query.query ? "text-c-old-gold border-c-old-gold" : "hover:text-c-snow-white hover:border-c-snow-white" }`}>
                      {query.name}
                    </Link>
                  </li>
                ))
              }
              <li className="-ml-px">
                <Link href={`/${route.route}`} className={`flex py-1 pr-2 pl-4 border-l w-fit cursor-pointer ${ routeModule?.route === route.route && routeModule?.query === undefined ? "text-c-old-gold border-c-old-gold" : "hover:text-c-snow-white hover:border-c-snow-white" }`}>
                  Ver Todos
                </Link>
              </li>
            </ul>
          </li>
        ))
      }
    </ul>
  )
}
