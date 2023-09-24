'use client'

import { getTotalProducts } from '@/lib/api/get-total-products'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  className: string
}

export const ProductCount: React.FC<Props> = ({ className }) => {
  const [count, setCount] = useState(0)

  const { category } = useParams()
  const searchParams = useSearchParams()

  const fetchData = async (): Promise<void> => {
    setCount(await getTotalProducts(category as string, searchParams))
  }

  useEffect(() => {
    void fetchData()
  }, [searchParams])

  return (
    <span className={className}>{count} productos</span>
  )
}
