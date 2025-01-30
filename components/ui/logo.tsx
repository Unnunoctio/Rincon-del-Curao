import '@/app/globals.css'
import { LogoIcon } from '@/icons/ui/logo-icon'
import Link from 'next/link'

interface Props {
  classNameBoxHeight: string
  classNameLogoWidth: string
}

export const Logo: React.FC<Props> = ({ classNameBoxHeight, classNameLogoWidth }) => {
  return (
    <div className={`${classNameBoxHeight} logo-container`}>
      <Link href='/' aria-label='home' className='logo-link'>
        <LogoIcon className={`${classNameLogoWidth} logo`} />
      </Link>
    </div>
  )
}
