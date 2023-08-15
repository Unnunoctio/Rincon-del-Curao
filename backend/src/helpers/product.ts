import { Types } from 'mongoose'
import { Website } from '../types'

export const generatePath = (id: string, pid: string, title: string): string => {
  const idPath = id.substring(id.length - 3) + pid.substring(pid.length - 3)
  const titlePath: string = title.toLowerCase().replaceAll('.', '').replaceAll('°', '').replaceAll(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return `${idPath}-${titlePath}`
}

export const getProductAverage = (websites: Types.DocumentArray<Website>): number => {
  let count = 0
  let sumAverage = 0

  for (const website of websites) {
    if (website.average !== null) {
      count++
      sumAverage += website.average
    }
  }

  return count > 0 ? sumAverage / count : 0
}
