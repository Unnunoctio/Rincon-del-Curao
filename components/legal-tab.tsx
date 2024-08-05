'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  link: string
  label: string
}

export const LegalTab: React.FC<Props> = ({ link, label }) => {
  const pathname = usePathname()
  const selected = pathname === link

  return (
    <Link
      href={link}
      className={`${selected ? 'legal-tab-selected' : 'legal-tab'}`}
    >
      {label}
    </Link>
  )
}
