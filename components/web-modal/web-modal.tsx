/* eslint-disable @typescript-eslint/no-misused-promises */
import { RightIcon } from '@/icons'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { WebList } from './web-list'
import { setCookie } from '@/app/actions'
import { Slide, toast } from 'react-toastify'

export const WebModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = (): void => setIsOpen(true)
  const onClose = (): void => setIsOpen(false)

  const successNotify = (): any => toast.success('Tiendas guardadas', {
    containerId: 'notification',
    autoClose: 3000,
    theme: 'colored',
    transition: Slide
  })
  const errorNotify = (): any => toast.error('Debes seleccionar al menos una tienda', {
    containerId: 'notification',
    autoClose: 3000,
    theme: 'colored',
    transition: Slide
  })

  const onAction = async (formData: FormData): Promise<void> => {
    const newPrefWebs = formData.getAll('webs').join(',')
    const success = await setCookie('prefWebs', newPrefWebs)
    if (success) {
      onClose()
      // reload page
      successNotify()
    } else {
      errorNotify()
    }
  }

  return (
    <>
      <div className='modal-button-container'>
        <Button
          onClick={onOpen}
          className='modal-button'
          aria-label='tiendas'
        >
          Tiendas
          <RightIcon className='modal-button-icon-stroke' />
        </Button>
      </div>

      <Dialog open={isOpen} as='div' className='modal' onClose={onClose}>
        <DialogBackdrop transition className='modal-backdrop' />
        <div className='modal-container'>
          <form action={onAction} className='modal-container-center'>
            <DialogPanel
              transition
              className='modal-panel'
            >
              <DialogTitle as='h3' className='modal-title'>
                Tiendas
              </DialogTitle>
              <hr className='modal-divider' />
              <WebList />
              <hr className='modal-divider' />
              <div className='modal-bottom-buttons-container'>
                <button aria-label='cancelar tiendas seleccionadas' type='button' onClick={onClose} className='modal-button-cancel'>
                  Cancelar
                </button>
                <button aria-label='guardar tiendas seleccionadas' type='submit' className='modal-button-submit'>
                  Guardar
                </button>
              </div>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </>
  )
}
