import { IsSlugExist } from '@/graphql/types'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { cache } from 'react'

const client = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION as string,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY as string
  }
})

export const getIsSlugExistDB = cache(async (slug: string): Promise<IsSlugExist> => {
  try {
    const command = new GetItemCommand({
      TableName: process.env.DYNAMODB_TABLE as string,
      Key: {
        PK: { S: slug }
      }
    })

    const data = await client.send(command)
    if (data.Item !== undefined) {
      return {
        isExist: true,
        title: data.Item.title.S as string
      }
    }
    return {
      isExist: false,
      title: ''
    }
  } catch (error) {
    console.error(error)
    return {
      isExist: false,
      title: ''
    }
  }
})
