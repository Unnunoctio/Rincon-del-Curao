'use client'

import { HistoryPrice } from '@/types/api'
import { useEffect, useState } from 'react'
import { HistoryLoader } from './history-loader'
import { HistoryNotFound } from './history-not-found'
import { HistoryPricies } from './history-pricies'

interface Props {
  path: string
  hash: string
}

export const ProductHistory: React.FC<Props> = ({ path, hash }) => {
  const [historyPrices, setHistoryPrices] = useState<HistoryPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistoryPricies = async (): Promise<void> => {
      setIsLoading(true)
      const response = await fetch(`/api/history-prices?path=${path}`)
      const data = await response.json()
      setHistoryPrices(data)
      setIsLoading(false)
    }
    void fetchHistoryPricies()
  }, [hash])

  if (isLoading) return <HistoryLoader />
  if (historyPrices.length === 0) return <HistoryNotFound />

  return <HistoryPricies historyPricies={historyPrices} />
}
