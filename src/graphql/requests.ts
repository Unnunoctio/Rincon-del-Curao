import { GET_ALL_WEBS } from "@/graphql/queries";
import type { WebInfo } from "@/graphql/types";

export const getAllWebs = async (): Promise<WebInfo[]> => {
  interface QueryResponse {
    allWebs: WebInfo[]
  }

  const response = await fetch(process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string
    },
    body: JSON.stringify({
      query: GET_ALL_WEBS
    }),
    cache: "force-cache"
  })

  const { data }: { data: QueryResponse } = await response.json()
  return data.allWebs
}
