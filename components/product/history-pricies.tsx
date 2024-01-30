'use client'

import { useCallback, useMemo } from 'react'
import { AxisOptions, Chart, Series } from 'react-charts'
import { HistoryPrice } from '@/types/api'
import { HistoryContainer } from './history-container'
import { useTheme } from 'next-themes'
import { getHistoryWith } from '@/helpers/history'

interface Props {
  historyPricies: HistoryPrice[]
}

interface MyDatum { date: Date, price: number }

export const HistoryPricies: React.FC<Props> = ({ historyPricies }) => {
  const { theme, systemTheme } = useTheme()
  const historyWidth = getHistoryWith(historyPricies.map(hp => hp.records).flat())

  const data = historyPricies.map((historyPrice) => {
    return {
      label: historyPrice.website,
      data: historyPrice.records.map((record) => {
        const date = new Date(record.date)

        return {
          date,
          price: record.price
        }
      })
    }
  })

  const primaryAxis = useMemo((): AxisOptions<MyDatum> => ({
    getValue: datum => datum.date,
    scaleType: 'time'
  }), [])

  const secondaryAxes = useMemo((): Array<AxisOptions<MyDatum>> => [
    {
      getValue: datum => datum.price,
      elementType: 'line',
      showDatumElements: true
    }
  ], [])

  const getSeriesStyle = useCallback((series: Series<MyDatum>) => {
    const colorPalette: { [key: string]: string } = {
      Jumbo: '#1FA02E',
      Lider: '#0071DC',
      'Santa Isabel': '#D91E18'
    }

    return {
      fill: colorPalette[series.label],
      stroke: colorPalette[series.label],
      r: '3px'
    }
  }, [])

  return (
    <section className='w-full mt-10'>
      <h2 className='text-primary font-medium text-2xl'>Historial de Precios</h2>
      <div className='max-w-[1500px] overflow-x-auto'>
        <HistoryContainer width={historyWidth}>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              dark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
              interactionMode: 'primary',
              getSeriesStyle
            }}
          />
        </HistoryContainer>
      </div>
    </section>
  )
}
