import { defineCollection, z } from "astro:content";
import { getAllWebs } from "./graphql/requests";

const webInfo = defineCollection({
  loader: async () => {
    const allWebs = await getAllWebs()
    return allWebs.map((web) => ({
      id: web.code,
      ...web
    }))
  },
  schema: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string()
  })
})

export const collections = {
  webInfo
}