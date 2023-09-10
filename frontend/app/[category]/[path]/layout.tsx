import { notFound } from 'next/navigation'

const fetchIsProduct = async (path: string): Promise<boolean> => {
  const res = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '7b6c806f-4923-4e35-9458-8877598e2b62'
    },
    body: JSON.stringify({
      query: `
        query GetIsProduct($path: ID!) {
          isProductPath(path: $path)
        }
      `,
      variables: {
        path
      }
    }),
    cache: 'no-store'
  })
  const { data } = await res.json()
  return data.isProductPath
}

const fetchProductTitle = async (path: string): Promise<string | undefined> => {
  const res = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '7b6c806f-4923-4e35-9458-8877598e2b62'
    },
    body: JSON.stringify({
      query: `
        query GetProduct($path: ID!) {
          product(path: $path) {
            title
          }
        }
      `,
      variables: {
        path
      }
    }),
    cache: 'no-store'
  })
  const { data } = await res.json()

  return data?.product?.title
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function generateMetadata ({ params }: { params: { path: string } }) {
  const { path } = params
  const productTitle = await fetchProductTitle(path)

  if (productTitle !== undefined) {
    return {
      title: `${productTitle} | Rincón del Curao`
    }
  }
  return {
    title: '404 | Rincón del Curao'
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function ProductsLayout ({ children, params }: { children: React.ReactNode, params: { path: string } }) {
  const { path } = params
  if (!(await fetchIsProduct(path))) {
    notFound()
  }

  return (
    <>
      {children}
    </>
  )
}
