import { generatePagination } from '@/helpers/pagination'
import { PaginationNumber } from './pagination-number'

interface Props {
  currentPage: number
  totalPages: number | undefined
}

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  if (totalPages === undefined || totalPages <= 1) return <></>

  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className='pagination'>
      {pages.map((page: any, index) => (
        <PaginationNumber key={index} page={page} isActive={currentPage === page} />
      ))}
    </div>
  )
}
