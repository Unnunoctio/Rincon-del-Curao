import Link from 'next/link'
import { LeftIcon, RightIcon } from '@/icons'

interface Props {
  href: string
  direction: string
  isDisabled: boolean
}

export const PaginationArrow: React.FC<Props> = ({ href, direction, isDisabled }) => {
  if (isDisabled) return null

  const icon = direction === 'left'
    ? <LeftIcon className='w-8 h-8 fill-transparent icon-stroke-secondary transition-colors group-hover:icon-stroke-contrast' />
    : <RightIcon className='w-8 h-8 fill-transparent icon-stroke-secondary transition-colors group-hover:icon-stroke-contrast' />

  return (
    <Link href={href} aria-label={direction === 'left' ? 'página anterior' : 'página siguiente'} className='group flex justify-center items-center w-[34px] h-[34px] rounded-md transition-colors hover:bg-active/75'>
      {icon}
    </Link>
  )
}
