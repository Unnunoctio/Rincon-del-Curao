import { WebInfo } from '@/graphql/types'
import { generateClient, GraphQLResult } from '@aws-amplify/api'
import { GET_ALL_WEBS } from './queries'

const API = generateClient()

export const getAllWebs = async (): Promise<WebInfo[]> => {
  interface QueryResponse {
    allWebs: WebInfo[]
  }

  const response = await API.graphql({
    query: GET_ALL_WEBS
  }) as GraphQLResult<QueryResponse>

  return response.data.allWebs
}
