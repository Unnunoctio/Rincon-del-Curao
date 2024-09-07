import { generatePagination } from '@/helpers/pagination'
import { PaginationNumber } from './pagination-number'

interface Props {
  isLoading: boolean
  currentPage: number
  totalPages: number | undefined
}

export const Pagination: React.FC<Props> = ({ isLoading, currentPage, totalPages }) => {
  if (isLoading || totalPages === undefined || totalPages <= 1) return <></>

  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className='pagination'>
      {pages.map((page: any, index) => (
        <PaginationNumber key={index} page={page} isActive={currentPage === page} />
      ))}
    </div>
  )
}
