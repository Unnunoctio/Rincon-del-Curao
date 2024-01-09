import { LogoSVG } from '@/icons'
import Link from 'next/link'

interface Props {
  boxHeight: string
  logoWidth: string
  linkClass: string
}

export const Logo: React.FC<Props> = ({ boxHeight, logoWidth, linkClass }) => {
  return (
    <div className={`${boxHeight} flex items-center`}>
      <Link href='/' aria-label='home' className={linkClass}>
        <LogoSVG className={`${logoWidth} h-auto aspect-[1078/342]`} />
      </Link>
    </div>
  )
}
