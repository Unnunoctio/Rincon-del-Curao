'use client'

import { useProductsFilter } from "@/providers/products-filter-provider"
import { useEffect, useState } from "react"
import { PaginationNumber } from "./pagination-number"

export const generatePagination = (currentPage: number, totalPages: number): Array<number | null> => {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, null, totalPages]
  }

  if (currentPage + 2 >= totalPages) {
    return [1, null, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages]
}

export const Pagination = () => {
  const { isLoading, totalPages, currentPage } = useProductsFilter()
  const [pagination, setPagination] = useState<Array<number | null>>([])

  useEffect(() => {
    setPagination(generatePagination(currentPage, totalPages))
  }, [currentPage, totalPages])

  if (isLoading || totalPages <= 1) return <></>

  return (
    <section className="flex justify-center gap-1 xs:gap-2 w-full">
      {pagination.map((page, index) => (
        <PaginationNumber key={index} page={page} isCurrent={page === currentPage} />
      ))}
    </section>
  )
}
