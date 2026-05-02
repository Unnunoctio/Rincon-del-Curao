const GRAPHQL_URL = process.env.GRAPHQL_URL

export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    if (!GRAPHQL_URL) throw new Error('GRAPHQL_URL is not defined')

    const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: false, tags: ['stores'] },
    })

    if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`)

    const { data, errors } = await res.json()
    if (errors?.length) throw new Error(errors[0].message)

    return data as T
}
