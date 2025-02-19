import { getSecret } from "astro:env/server";
import { GET_ALL_WEBS } from "./queries";
import type { WebInfo } from "./types";


export const getAllWebs = async (): Promise<WebInfo[]> => {
  interface QueryResponse {
    allWebs: WebInfo[]
  }

  const response = await fetch(getSecret("APPSYNC_ENDPOINT") as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": getSecret("APPSYNC_API_KEY") as string
    },
    body: JSON.stringify({
      query: GET_ALL_WEBS
    })
  })

  const { data }: { data: QueryResponse } = await response.json()
  return data.allWebs
}