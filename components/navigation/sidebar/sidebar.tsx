import { SidebarLogo } from '@/components/logo'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { SidebarCloseButton } from './sidebar-close-button'
import { SidebarLinks } from './sidebar-links'
import { useUIStore } from '@/stores'

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore((state) => state)

  return (
    <Dialog open={isSidebarOpen} onClose={closeSidebar} className='sidebar'>
      <DialogBackdrop transition className='sidebar-backdrop' />
      <div className='sidebar-container'>
        <div className='sidebar-container-absolute'>
          <div className='sidebar-container-width'>
            <DialogPanel transition className='sidebar-panel'>
              <div className='sidebar-items'>
                <DialogTitle className='sidebar-title'>
                  <SidebarLogo boxHeight='h-[88px]' logoWidth='w-[140px]' linkClass='transition-transform scale-[0.97] hover:scale-100 sm:scale-100 sm:hover:scale-[1.03]' />
                  <SidebarCloseButton />
                </DialogTitle>
                <div className='sidebar-container-links'>
                  <SidebarLinks />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
