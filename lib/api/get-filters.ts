import { getVariablesFilter } from '@/helpers/filter-helper'
import { FilterOptions } from '@/types/api'
import { ReadonlyURLSearchParams } from 'next/navigation'

const query = `
  query Query($filters: FilterInput!) {
    filterOptions(filters: $filters) {
      subCategory {
        label
        value
      }
      brand {
        label
        value
      }
      content {
        label
        value
      }
      quantity {
        label
        value
      }
      package {
        label
        value
      }
    }
  }
`
interface Response {
  filterOptions: FilterOptions
}

export const getFilters = async (category: string, searchParams: ReadonlyURLSearchParams): Promise<FilterOptions> => {
  const variables = {
    filters: getVariablesFilter(category, searchParams)
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const { data }: { data: Response } = await res.json()
  return data.filterOptions
}
