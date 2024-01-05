import { InfoDB } from '@/types/models'
import InfoModel from '../models/InfoModel'
import { connectDB } from '../utils/mongoose'
import { Web } from '@/types/api'

export const getAllWebs = async (): Promise<Web[]> => {
  await connectDB()

  const infos = await InfoModel.find<InfoDB>()
  infos.sort((a, b) => a.name.localeCompare(b.name))

  return infos.map(info => {
    return {
      code: info._id.toString(),
      name: info.name,
      url: info.url,
      logo: info.logo
    }
  })
}
// ! Deprecated
// import { Web } from '@/types/api'

// const query = `
//   query TotalWebs {
//     totalWebs {
//       code
//       name
//       url
//       logo
//     }
//   }
// `

// interface Response {
//   totalWebs: Web[]
// }

// export const getAllWebs = async (): Promise<Web[]> => {
//   const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
//     },
//     body: JSON.stringify({
//       query
//     }),
//     cache: 'no-store'
//   })

//   const { data }: { data: Response } = await res.json()
//   return data.totalWebs
// }
