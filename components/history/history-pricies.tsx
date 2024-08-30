/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { AxisOptions, Chart, Series } from 'react-charts'
import { PriceHistory } from '@/types/api'
import { HistoryContainer } from './history-container'
import { useTheme } from 'next-themes'
import { getHistoryData } from '@/helpers/history'

interface Props {
  historyPricies: PriceHistory[]
}

interface MyDatum { date: Date, price: number }

export const HistoryPricies: React.FC<Props> = ({ historyPricies }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { theme, systemTheme } = useTheme()
  const [historyWidth, minDate, maxDate] = getHistoryData(historyPricies.map(hp => hp.priceLogs).flat())

  const data = historyPricies.map((historyPrice): any => {
    return {
      label: historyPrice.website,
      data: historyPrice.priceLogs.map((log) => {
        const date = new Date(log.date)
        let localDate = date

        if (date.getTimezoneOffset() < 0) {
          localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
        } else if (date.getTimezoneOffset() > 0) {
          localDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000))
        }

        return {
          date: localDate,
          price: log.price
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

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.scrollLeft = ref.current.scrollWidth
    }
  }, [])

  return (
    <>
      <ul className='history-legend-container'>
        {
          historyPricies.sort((a, b) => a.website.localeCompare(b.website)).map((historyPrice, index) => (
            <li key={index} className='history-legend-item'>
              <span className='history-legend-item-color' style={{ backgroundColor: colorPalette[historyPrice.website] }} />
              <span className='history-legend-item-text'>{historyPrice.website}</span>
            </li>
          ))
        }
      </ul>
      <div ref={ref} className='history-chart-container'>
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
    </>
  )
}
