import Image from 'next/image'
import Link from 'next/link'

interface Props {
  width: number
  height: number
  className: string
  sideClose: () => void
}

export const SidebarLogo: React.FC<Props> = ({ width, height, className, sideClose }) => {
  return (
    <Link href='/' className={className} onClick={sideClose}>
      <Image src='/logo.png' alt='logo' width={width} height={height} quality={100} priority />
    </Link>
  )
}
