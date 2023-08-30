import { ProductScraper } from './types'
import path from 'node:path'
import ExcelJS from 'exceljs'

export const createExcel = (products: ProductScraper[]): void => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('ProductsNotFound')

  worksheet.columns = [
    { header: 'Sitio', key: 'website' },
    { header: 'Producto', key: 'title' },
    { header: 'Marca', key: 'brand' },
    { header: 'Categoria', key: 'category' },
    { header: 'Sub Categoria', key: 'subCategory' },
    { header: 'URL', key: 'url' }
  ]

  for (const product of products) {
    worksheet.addRow({
      website: product.websiteName,
      title: product.title,
      brand: product.brand,
      category: product.category,
      subCategory: product.subCategory,
      url: product.url
    })
  }

  const excelPath = path.join('ProductsNotFound.xlsx')
  workbook.xlsx.writeFile(excelPath)
    .then(() => console.log('Excel file created'))
    .catch(err => console.log('Error to create Excel file', err.message))
}
