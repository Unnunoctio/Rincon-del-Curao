/* eslint-disable @typescript-eslint/no-misused-promises */
import { setCookie } from '@/app/actions'
import { RightIcon } from '@/icons/ui/right-icon'
import { useUIStore } from '@/stores/ui-store'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { Slide, toast } from 'react-toastify'
import { InlineLoader } from '../ui/inline-loader'
import { WebList } from './web-list'

export const WebModal: React.FC = () => {
  const { isWebModalOpen, openWebModal, closeWebModal } = useUIStore((state) => state)
  const [isActionLoading, setIsActionLoading] = useState(false)

  const successNotify = (): any => toast.success('Tiendas guardadas', {
    containerId: 'notification',
    theme: 'colored',
    transition: Slide
  })

  const errorNotify = (): any => toast.error('Debes seleccionar al menos una tienda', {
    containerId: 'notification',
    theme: 'colored',
    transition: Slide
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsActionLoading(true)

    const newPrefersWebs = new FormData(e.target as HTMLFormElement).getAll('prefer-web').join(',')
    const success = await setCookie('prefers-webs', newPrefersWebs)
    if (success) {
      closeWebModal()
      successNotify()
      await new Promise((resolve) => setTimeout(resolve, 300))
    } else {
      errorNotify()
    }
    setIsActionLoading(false)
  }

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
          <form onSubmit={onSubmit} className='n-modal-content'>
            <DialogPanel
              transition
              className='n-modal-panel'
            >
              <DialogTitle as='h3' className='n-modal-title'>
                Tiendas
              </DialogTitle>
              <hr className='n-modal-divider' />

              <WebList isDisabled={isActionLoading} />

              <hr className='n-modal-divider' />

              <section className='n-modal-bottom-buttons-container'>
                {
                  !isActionLoading &&
                    <>
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
                    </>
                }
                {
                  isActionLoading &&
                    <div className='n-modal-inline-loader-container'>
                      <InlineLoader />
                    </div>
                }
              </section>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </>
  )
}
