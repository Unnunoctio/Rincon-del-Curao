'use client'

import { useCallback, useMemo } from 'react'
import { AxisOptions, Chart, Series } from 'react-charts'
import { HistoryPrice } from '@/types/api'
import { HistoryContainer } from './history-container'
import { useTheme } from 'next-themes'
import { getHistoryData } from '@/helpers/history'

interface Props {
  historyPricies: HistoryPrice[]
}

interface MyDatum { date: Date, price: number }

export const HistoryPricies: React.FC<Props> = ({ historyPricies }) => {
  const { theme, systemTheme } = useTheme()
  const [historyWidth, minDate, maxDate] = getHistoryData(historyPricies.map(hp => hp.records).flat())

  const data = historyPricies.map((historyPrice): any => {
    return {
      label: historyPrice.website,
      data: historyPrice.records.map((record) => {
        return {
          date: new Date(record.date),
          price: record.price
        }
      })
    }
  })

  const primaryAxis = useMemo((): AxisOptions<MyDatum> => ({
    getValue: datum => datum.date,
    scaleType: 'localTime',
    min: minDate,
    max: maxDate,
    formatters: {
      scale: (value) => {
        if (value === null) return ''
        let month = value.toLocaleDateString('es-ES', { month: 'short' })
        month = month.charAt(0).toUpperCase() + month.slice(1)
        return `${month} ${value.getDate()}`
      },
      tooltip: (value) => {
        let month = value.toLocaleDateString('es-ES', { month: 'long' })
        month = month.charAt(0).toUpperCase() + month.slice(1)
        return `${value.getDate()} de ${month}`
      }
    }
  }), [historyPricies])

  const secondaryAxes = useMemo((): Array<AxisOptions<MyDatum>> => [
    {
      getValue: datum => datum.price,
      elementType: 'line',
      showDatumElements: true,
      formatters: {
        scale: (value: number) => {
          if (value === null) return ''
          return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
        }
      }
    }
  ], [historyPricies])

  const colorPalette: { [key: string]: string } = {
    Jumbo: '#1FA02E',
    Lider: '#0071DC',
    'Santa Isabel': '#D91E18'
  }

  const getSeriesStyle = useCallback((series: Series<MyDatum>) => {
    return {
      fill: colorPalette[series.label],
      stroke: colorPalette[series.label],
      r: '3px'
    }
  }, [])

  return (
    <section className='w-full mt-10'>
      <h2 className='text-primary font-medium text-2xl'>Historial de Precios</h2>
      <ul className='ml-2 mt-4 flex flex-wrap gap-x-6 gap-y-1'>
        {
          historyPricies.map((historyPrice, index) => (
            <li key={index} className='flex gap-1 items-baseline'>
              <span className='inline-block w-3 h-3 rounded-full' style={{ backgroundColor: colorPalette[historyPrice.website] }} />
              <span className='text-primary font-medium text-[14px]'>{historyPrice.website}</span>
            </li>
          ))
        }
      </ul>
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
