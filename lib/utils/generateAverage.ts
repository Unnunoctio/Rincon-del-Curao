import { WebsiteDB } from '@/types/models'

export const generateAverage = (websites: WebsiteDB[]): number => {
  let count = 0
  let sum = 0
  for (const website of websites) {
    if (website.average !== null) {
      count++
      sum += website.average
    }
  }

  return count > 0 ? (sum / count) : 0
}
