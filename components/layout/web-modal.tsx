import { RightIcon } from '@/icons/ui/right-icon'
import { useUIStore } from '@/stores/ui-store'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { WebList } from './web-list'

export const WebModal: React.FC = () => {
  const { isWebModalOpen, openWebModal, closeWebModal } = useUIStore((state) => state)

  return (
    <>
      <button
        onClick={openWebModal}
        className='n-modal-button'
        aria-label='Abrir tiendas'
      >
        Tiendas
        <RightIcon className='n-modal-icon' />
      </button>

      <Dialog open={isWebModalOpen} as='div' className='n-modal-container' onClose={closeWebModal}>
        <DialogBackdrop transition className='n-modal-backdrop' />
        <div className='n-modal-container'>
          <form className='n-modal-content'>
            <DialogPanel
              transition
              className='n-modal-panel'
            >
              <DialogTitle as='h3' className='n-modal-title'>
                Tiendas
              </DialogTitle>
              <hr className='n-modal-divider' />

              <WebList />

              <hr className='n-modal-divider' />
              <section className='n-modal-bottom-buttons-container'>
                <button
                  onClick={closeWebModal}
                  className='n-modal-bottom-button n-modal-button-cancel'
                  aria-label='Cancelar tiendas seleccionadas'
                  type='button'
                >
                  Cancelar
                </button>
                <button
                  className='n-modal-bottom-button n-modal-button-save'
                  aria-label='Guardar tiendas seleccionadas'
                  type='submit'
                >
                  Guardar
                </button>
              </section>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </>
  )
}
