import { JumboSpider, SantaSpider } from './spiders/index.js'

export const startScraping = async (): Promise<boolean> => {
  console.log('Starting scraping')

  const jumboSpider = new JumboSpider()
  const santaSpider = new SantaSpider()

  await jumboSpider.run()
  await new Promise(resolve => setTimeout(resolve, 2000))
  await santaSpider.run()

  return true
}
