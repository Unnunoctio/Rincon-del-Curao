import { Record } from '@/types/api'

export const getHistoryData = (records: Record[]): [number, Date, Date] => {
  const timestamps = records.map((record) => new Date(record.date).getTime())

  const minTimestamp = Math.min(...timestamps)
  const maxTimestamp = Math.max(...timestamps)

  const differenceInDays = (maxTimestamp - minTimestamp) / 86400000
  const width = (differenceInDays > 1) ? differenceInDays * 60 : 46
  return [(width + 67), new Date(minTimestamp), new Date(maxTimestamp)]
}
