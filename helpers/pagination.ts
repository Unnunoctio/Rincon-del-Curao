
export const generatePagination = (currentPage: number, totalPages: number): any => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5]
  }

  return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
}
