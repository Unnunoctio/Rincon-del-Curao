import { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}

export async function connectDB (): Promise<void> {
  if (conn.isConnected) return

  const db = await connect(process.env.NEXT_PUBLIC_DB_URI as string)
  conn.isConnected = Boolean(db.connections[0].readyState)
}

connection.on('connected', () => {
  console.log('Connected to database')
})

connection.on('error', (err) => {
  console.log('Database connection error', err)
})
