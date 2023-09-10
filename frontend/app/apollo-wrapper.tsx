'use client'

import { ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { ApolloNextAppProvider, NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient (): NextSSRApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: 'http://localhost:5000/',
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: 'no-store' },
    headers: {
      'x-api-key': '7b6c806f-4923-4e35-9458-8877598e2b62'
    }
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  })

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
          // in a SSR environment, if you use multipart features like
          // @defer, you need to decide how to handle these.
          // This strips all interfaces with a `@defer` directive from your queries.
          new SSRMultipartLink({
            stripDefer: true
          }),
          httpLink
        ])
        : httpLink
  })
}

// you need to create a component to wrap your app in
export function ApolloWrapper ({ children }: React.PropsWithChildren): React.ReactNode {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
