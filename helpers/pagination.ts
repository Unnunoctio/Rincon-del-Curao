
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
