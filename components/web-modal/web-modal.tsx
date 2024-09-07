/* eslint-disable @typescript-eslint/no-misused-promises */
import { RightIcon } from '@/icons'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { WebList } from './web-list'
import { setCookie } from '@/app/actions'
import { Slide, toast } from 'react-toastify'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getNavigateLink } from '@/helpers/path'
import { useUIStore } from '@/stores'

export const WebModal: React.FC = () => {
  const { isWebModalOpen, openWebModal, closeWebModal } = useUIStore((state) => state)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
      const pathSplit = pathname.split('/')
      if (getNavigateLink(`/${pathSplit[1]}`) !== undefined) {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        router.push(`${pathname}?${params.toString()}`)
      }
      closeWebModal()
      successNotify()
    } else {
      errorNotify()
    }
  }

  return (
    <>
      <div className='modal-button-container'>
        <Button
          onClick={openWebModal}
          className='modal-button'
          aria-label='tiendas'
        >
          Tiendas
          <RightIcon className='modal-button-icon-stroke' />
        </Button>
      </div>

      <Dialog open={isWebModalOpen} as='div' className='modal' onClose={closeWebModal}>
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
                <button aria-label='cancelar tiendas seleccionadas' type='button' onClick={closeWebModal} className='modal-button-cancel'>
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
