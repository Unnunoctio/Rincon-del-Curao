import { LogoIcon } from '@/icons'
import Link from 'next/link'

interface Props {
  boxHeight: string
  logoWidth: string
  linkClass: string
  sideClose: () => void
}

export const SidebarLogo: React.FC<Props> = ({ boxHeight, logoWidth, linkClass, sideClose }) => {
  return (
    <div className={`${boxHeight} logo-container`}>
      <Link href='/' aria-label='home' className={linkClass} onClick={sideClose}>
        <LogoIcon className={`${logoWidth} logo`} />
      </Link>
    </div>
  )
}
