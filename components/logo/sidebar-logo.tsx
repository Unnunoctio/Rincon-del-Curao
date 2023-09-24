import Link from 'next/link'
import { LogoSVG } from './icons/logo-svg'

interface Props {
  boxHeight: string
  logoWidth: string
  linkClassName: string
  sideClose: () => void
}

export const SidebarLogo: React.FC<Props> = ({ boxHeight, logoWidth, linkClassName, sideClose }) => {
  return (
    <div className={`${boxHeight} flex items-center`}>
      <Link href='/' className={linkClassName} onClick={sideClose}>
        <LogoSVG className={`${logoWidth} h-auto aspect-[1078/342]`} />
      </Link>
    </div>
  )
}
