'use client'

import { ChevronDownIcon, XIcon } from '@/icons'
import { Listbox } from '@headlessui/react'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Durward Reynolds Eficiente' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' }
]

export const MultiSelectV2 = (): React.ReactNode => {
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

  const onSelectedRemove = (item: { id: number, name: string }): void => {
    setSelectedPeople(selectedPeople.filter((person) => person.id !== item.id))
  }

  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      {({ open }) => (
        <div className='relative'>
          <div className={`flex justify-between overflow-hidden w-full min-h-[38px] rounded-md border ${open ? 'border-active' : 'border-primary'} transition-colors`}>
            <ul className='flex flex-wrap gap-1 px-2 py-1 w-full justify-start border-r border-primary overflow-hidden'>
              {selectedPeople.map((person) => (
                <li
                  key={person.id}
                  className='flex items-center gap-1 pl-2 pr-1 py-0.5 overflow-hidden rounded-md bg-active/60'
                >
                  <span className='block w-full overflow-hidden whitespace-nowrap text-ellipsis text-[14px] font-medium'>
                    {person.name}
                  </span>
                  <button onClick={() => onSelectedRemove(person)} className='group'>
                    <XIcon className='w-5 h-5 icon-stroke-primary-60 group-hover:icon-stroke-primary transition-colors' />
                  </button>
                </li>
              ))}
            </ul>
            <Listbox.Button id='MultiSelect' className='flex items-center px-3 transition-colors hover:bg-selected' aria-label='Multi Select'>
              <ChevronDownIcon className={`icon-secondary transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
            </Listbox.Button>
          </div>
          {open && (
            <Listbox.Options>
              {people.filter((person) => !selectedPeople.some((selected) => selected.id === person.id)).map((person) => (
                <Listbox.Option key={person.id} value={person}>
                  {person.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </div>
      )}
    </Listbox>
  )
}
