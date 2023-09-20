'use client'

import { getTotalProducts } from '@/lib/api/get-total-products'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  className: string
}

export const ProductCount: React.FC<Props> = ({ className }) => {
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  const { category } = useParams()
  const searchParams = useSearchParams()

  const fetchData = async (): Promise<void> => {
    setLoading(true)
    setCount(await getTotalProducts(category as string, searchParams))
    setLoading(false)
  }

  useEffect(() => {
    void fetchData()
  }, [searchParams])

  if (loading) return <span className={className}>Cargando...</span>

  return (
    <span className={className}>{count} productos</span>
  )
}
