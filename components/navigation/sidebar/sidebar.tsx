import { SidebarLogo } from '@/components/logo'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { SidebarCloseButton } from './sidebar-close-button'
import { SidebarLinks } from './sidebar-links'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className='sidebar'>
      <DialogBackdrop transition className='sidebar-backdrop' />
      <div className='sidebar-container'>
        <div className='sidebar-container-absolute'>
          <div className='sidebar-container-width'>
            <DialogPanel transition className='sidebar-panel'>
              <div className='sidebar-items'>
                <DialogTitle className='sidebar-title'>
                  <SidebarLogo boxHeight='h-[88px]' logoWidth='w-[140px]' sideClose={onClose} linkClass='transition-transform scale-[0.97] hover:scale-100 sm:scale-100 sm:hover:scale-[1.03]' />
                  <SidebarCloseButton sideClose={onClose} />
                </DialogTitle>
                <div className='sidebar-container-links'>
                  <SidebarLinks onClose={onClose} />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
