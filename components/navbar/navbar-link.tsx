import Link from 'next/link'

interface Props {
  title: string
  href: string
  className: string
}

export const NavbarLink: React.FC<Props> = ({ title, href, className }) => {
  return (
    <Link href={href} className={className}>
      {title}
    </Link>
  )
}
