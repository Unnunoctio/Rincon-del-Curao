import Link from 'next/link'

interface Props {
  title: string
  href: string
  className: string
  sideClose: () => void
}

export const SidebarLink: React.FC<Props> = ({ title, href, className, sideClose }) => {
  return (
    <li>
      <Link href={href} onClick={sideClose} className={className}>
        {title}
      </Link>
    </li>
  )
}
