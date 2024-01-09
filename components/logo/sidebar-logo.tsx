import { LogoSVG } from '@/icons'
import Link from 'next/link'

interface Props {
  boxHeight: string
  logoWidth: string
  linkClass: string
  sideClose: () => void
}

export const SidebarLogo: React.FC<Props> = ({ boxHeight, logoWidth, linkClass, sideClose }) => {
  return (
    <div className={`${boxHeight} flex items-center`}>
      <Link href='/' aria-label='home' className={linkClass} onClick={sideClose}>
        <LogoSVG className={`${logoWidth} h-auto aspect-[1078/342]`} />
      </Link>
    </div>
  )
}
