import { PriceLog } from '@/types/api'

export const getHistoryData = (priceLogs: PriceLog[]): [number, Date, Date] => {
  const timestamps = priceLogs.map((log) => new Date(log.date).getTime())
  const pricies = priceLogs.map((log) => log.price)

  const minTimestamp = Math.min(...timestamps)
  const maxTimestamp = Math.max(...timestamps)

  const differenceInDays = (maxTimestamp - minTimestamp) / 86400000
  const widthDays = differenceInDays * 60

  const maxPrice = Math.max(...pricies)
  const widthPrice = maxPrice.toString().length * 14

  return [(widthDays + widthPrice), new Date(minTimestamp), new Date(maxTimestamp)]
}
