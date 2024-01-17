import { Tab } from '@headlessui/react'
import { useRouter } from 'next/navigation'

interface Props {
  link: string
  label: string
  selected: boolean
}

export const LegalTab: React.FC<Props> = ({ link, label, selected }) => {
  const router = useRouter()

  return (
    <Tab
      onClick={() => router.push(link)}
      className={`appearance-none w-full max-w-[200px] h-fit text-center lg:text-left rounded-tr-lg rounded-tl-lg lg:rounded-br-lg lg:rounded-tl-none py-3 px-2 lg:pl-3 transition-colors hover:bg-selected ${selected ? 'text-active border-b-4 lg:border-l-4 lg:border-b-0 border-active bg-selected' : 'text-primary border-b-4 lg:border-l-4 lg:border-b-0 border-transparent'}`}
    >
      {label}
    </Tab>
  )
}
