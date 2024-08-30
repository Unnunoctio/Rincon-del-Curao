import { getHistoryProduct } from '@/lib/api/product'
import { HistoryNotFound } from './history-not-found'
import { HistoryPricies } from './history-pricies'

interface Props {
  path: string
}

export const ProductHistory: React.FC<Props> = async ({ path }): Promise<JSX.Element> => {
  const historyPrices = await getHistoryProduct(path)

  if (historyPrices.length === 0) return <HistoryNotFound />

  return <HistoryPricies historyPricies={historyPrices} />
}
