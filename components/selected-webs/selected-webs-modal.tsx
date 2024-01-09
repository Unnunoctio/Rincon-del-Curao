/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { Fragment, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getCookie, setPrefWebs } from '@/app/actions'
import { Dialog, Transition } from '@headlessui/react'
import { WebCheckbox } from './web-checkbox'
import { RightIcon } from '@/icons'
import { Web } from '@/types/api'

interface Props {
  allWebs: Web[]
}

export const SelectedWebsModal: React.FC<Props> = ({ allWebs }): JSX.Element => {
  const [selectedWebs, setSelectedWebs] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onOpen = (): void => setIsOpen(true)
  const onClose = (): void => setIsOpen(false)

  const handleClick = async (): Promise<void> => {
    const prefWebs = await getCookie('prefWebs')
    if (prefWebs !== undefined) {
      setSelectedWebs(prefWebs.split(','))
    } else {
      setSelectedWebs(allWebs.map(web => web.code))
    }
    onOpen()
  }

  const onAction = async (formData: FormData): Promise<void> => {
    await setPrefWebs(formData)
    if (pathname.split('/').length === 2) {
      const params = new URLSearchParams(searchParams)
      params.set('page', '1')
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <>
      <div className='flex items-center p-0.5 rounded-full border divider-primary'>
        <button
          onClick={handleClick}
          className='flex justify-between w-full py-1 pl-2 rounded-full hover:bg-page transition-colors'
          aria-label='stores'
        >
          Tiendas
          <RightIcon className='fill-transparent icon-stroke-primary' />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0'>
            <form action={onAction} className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='flex flex-col gap-4 w-full max-w-6xl transform overflow-hidden rounded-lg bg-page p-4 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-2xl font-medium text-primary'>
                    Tiendas
                  </Dialog.Title>
                  <hr className='divider-primary' />
                  {/* Formulario de las tiendas */}
                  <ul className='min-h-[50vh] max-h-[65vh] overflow-y-auto flex flex-wrap content-start gap-3'>
                    {allWebs.map((web, index) => (
                      <li key={index} className='w-full max-w-[200px]'>
                        <WebCheckbox value={web.code} label={web.name} checked={selectedWebs.includes(web.code)} />
                      </li>
                    ))}
                  </ul>
                  <hr className='divider-primary' />
                  {/* Botones de guardar y cancelar */}
                  <div className='flex justify-end gap-4'>
                    <button aria-label='close stores' type='button' onClick={onClose} className='font-medium py-1.5 px-3 rounded-full border border-primary text-secondary transition-colors hover:bg-selected hover:text-active hover:border-active'>
                      Cancelar
                    </button>
                    <button aria-label='save stores' type='submit' onClick={onClose} className='font-medium py-1.5 px-3 rounded-full bg-active/75 border border-transparent text-primary transition-colors hover:bg-active'>
                      Guardar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </form>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
