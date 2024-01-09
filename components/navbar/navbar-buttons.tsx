import { Web } from '@/types/api'
import { MenuButton } from './menu-button'
import { OptionsButton } from './options-button'

interface Props {
  webs: Web[]
  onClose: () => void
  sideOpen: () => void
}

export const NavbarButtons: React.FC<Props> = ({ webs, onClose, sideOpen }) => {
  return (
    <div className='flex items-center gap-2 ml-0 md:ml-12 h-[71px]'>
      <OptionsButton webs={webs} onClose={onClose} />
      <MenuButton sideOpen={sideOpen} />
    </div>
  )
}
