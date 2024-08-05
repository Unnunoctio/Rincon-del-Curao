import { LogoIcon } from '@/icons'
import Link from 'next/link'

interface Props {
  boxHeight: string
  logoWidth: string
  linkClass: string
}

export const Logo: React.FC<Props> = ({ boxHeight, logoWidth, linkClass }) => {
  return (
    <div className={`${boxHeight} logo-container`}>
      <Link href='/' aria-label='home' className={linkClass}>
        <LogoIcon className={`${logoWidth} logo`} />
      </Link>
    </div>
  )
}
