'use client'

import { LogoIcon } from '@/icons/ui/logo-icon'
import { useUIStore } from '@/stores/ui-store'
import '@/styles/globals.css'
import Link from 'next/link'

interface Props {
  classNameBoxHeight: string
  classNameLogoWidth: string
}

export const Logo: React.FC<Props> = ({ classNameBoxHeight, classNameLogoWidth }) => {
  const { closeSidebar } = useUIStore((state) => state)

  return (
    <div className={`${classNameBoxHeight} logo-container`}>
      <Link href='/' aria-label='home' className='logo-link' onClick={closeSidebar}>
        <LogoIcon className={`${classNameLogoWidth} logo`} />
      </Link>
    </div>
  )
}
