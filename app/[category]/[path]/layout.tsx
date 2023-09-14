import { notFound } from 'next/navigation'

const fetchIsProduct = async (path: string): Promise<boolean> => {
  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
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
  const res = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY as string
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
