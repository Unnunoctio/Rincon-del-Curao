import { Record } from '@/types/api'

export const getHistoryWith = (records: Record[]): number => {
  const timestamps = records.map((record) => new Date(record.date).getTime())

  const minTimestamp = Math.min(...timestamps)
  const maxTimestamp = Math.max(...timestamps)

  const differenceInDays = (maxTimestamp - minTimestamp) / 86400000

  return differenceInDays * 60
}
