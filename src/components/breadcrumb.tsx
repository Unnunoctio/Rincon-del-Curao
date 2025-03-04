'use client'

import { ChevronDoubleRightIcon } from "@/icons/chevron-double-right"
import { BreadcrumbLink } from "@/types"
import Link from "next/link"

interface Props {
  links: BreadcrumbLink[]
}

export function Breadcrumb({ links }: Props) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-2 text-c-silver-gray">
      {
        links.map((link, index) => (
          (index === links.length - 1)
            ? (
              <p key={index} className="text-c-old-gold truncate">
                {link.name}
              </p>
              )
            : (
              <div key={index} className="flex items-center gap-2">
                <Link href={link.href} className="hover:text-c-snow-white">
                  {link.name}
                </Link>
                <ChevronDoubleRightIcon className="stroke-c-silver-gray w-5 h-5" />
              </div>
            )
        ))
      }
    </nav>
  )
}
