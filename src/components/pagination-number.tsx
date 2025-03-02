import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  page: number | null;
  isCurrent: boolean;
}

export const PaginationNumber = ({ page, isCurrent }: Props) => {
  if (page === null) {
    return (
      <div className="flex justify-evenly min-w-[24px] h-[34px] font-bold text-c-silver-gray">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    )
  }

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createURL = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <Link
      href={createURL(page)}
      aria-current={isCurrent}
      className="flex justify-center items-center aria-current:bg-c-old-gold border border-c-silver-gray aria-current:border-c-old-gold hover:border-c-old-gold rounded-md min-w-[34px] h-[34px] font-medium aria-current:font-bold text-c-silver-gray aria-current:text-c-lead-gray hover:text-c-old-gold"
    >
      {page}
    </Link>
  )
}
