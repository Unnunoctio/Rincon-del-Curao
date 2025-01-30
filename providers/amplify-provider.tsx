'use client'

import { Amplify } from 'aws-amplify'

export const AmplifyProvider: React.FC = (): null => {
  Amplify.configure({
    API: {
      GraphQL: {
        endpoint: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string,
        region: process.env.NEXT_PUBLIC_APPSYNC_REGION as string,
        defaultAuthMode: 'apiKey',
        apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string
      }
    }
  })

  return null
}
