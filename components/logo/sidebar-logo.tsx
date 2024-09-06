import { LogoIcon } from '@/icons'
import { useUIStore } from '@/stores'
import Link from 'next/link'

interface Props {
  boxHeight: string
  logoWidth: string
  linkClass: string
}

export const SidebarLogo: React.FC<Props> = ({ boxHeight, logoWidth, linkClass }) => {
  const { closeSidebar } = useUIStore((state) => state)

  return (
    <div className={`${boxHeight} logo-container`}>
      <Link href='/' aria-label='home' className={linkClass} onClick={closeSidebar}>
        <LogoIcon className={`${logoWidth} logo`} />
      </Link>
    </div>
  )
}
