/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Web } from '@/types/api'
import { WebCheckbox } from './web-checkbox'
import { WebListLoader } from './web-list-loader'
import { WebListError } from './web-list-error'
import { useEffect, useState } from 'react'

interface WebCheck extends Web {
  checked: boolean
}

export const WebList: React.FC = () => {
  const [webs, setWebs] = useState<WebCheck[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWebs = async (): Promise<void> => {
      setIsLoading(true)
      const response = await fetch('/api/all-webs')
      const data = await response.json()
      setWebs(data)
      setIsLoading(false)
    }
    void fetchWebs()
  }, [])

  if (isLoading) return <WebListLoader />
  if (webs.length === 0) return <WebListError />

  return (
    <ul className='web-list'>
      {webs?.map((web, index) => (
        <li key={index} className='web-item'>
          <WebCheckbox value={web.code} label={web.name} checked={web.checked} />
        </li>
      ))}
    </ul>
  )
}
