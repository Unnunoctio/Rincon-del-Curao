import { JumboSpider } from './spiders/index.js'

export const startScraping = async (): Promise<boolean> => {
  console.log('Starting scraping')

  const jumboSpider = new JumboSpider()
  await jumboSpider.run()

  return true
}
