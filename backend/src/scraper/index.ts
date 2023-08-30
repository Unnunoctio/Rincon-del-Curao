import { JumboSpider, SantaSpider } from './spiders/index.js'
import { ProductScraper } from './types.js'
import { createExcel } from './utilsExcel.js'

export const startScraping = async (): Promise<boolean> => {
  console.time('Scraping')
  console.log('Starting scraping')
  const productsNotFound: ProductScraper[] = []

  const jumboSpider = new JumboSpider()
  const santaSpider = new SantaSpider()

  const jumboNotFound = await jumboSpider.run()
  productsNotFound.push(...jumboNotFound)

  await new Promise(resolve => setTimeout(resolve, 1000))

  const santaNotFound = await santaSpider.run()
  productsNotFound.push(...santaNotFound)

  createExcel(productsNotFound)
  console.timeEnd('Scraping')
  return true
}
