import Link from 'next/link'
import { LogoSVG } from './icons/logo-svg'

interface Props {
  boxHeight: string
  logoWidth: string
  linkClassName: string
}

export const Logo: React.FC<Props> = ({ boxHeight, logoWidth, linkClassName }) => {
  return (
    <div className={`${boxHeight} flex items-center`}>
      <Link href='/' className={linkClassName}>
        <LogoSVG className={`${logoWidth} h-auto aspect-[1078/342]`} />
      </Link>
    </div>
  )
}
