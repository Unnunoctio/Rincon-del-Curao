import Link from 'next/link'

interface Props {
  href: string
  page: number
  isActive: boolean
  className?: string
}

export const PaginationNumber: React.FC<Props> = ({ href, page, isActive, className = '' }) => {
  return (
    <Link href={href} aria-label={`page ${page}`} className={`${className} flex justify-center items-center min-w-[34px] h-[34px] font-bold rounded-md border transition-colors ${isActive ? 'text-contrast bg-active/75 border-transparent' : 'text-secondary text-hover border-primary border-hover'}`}>
      {page}
    </Link>
  )
}
