import 'dotenv/config'
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from 'pg'

import * as schema from './schema'

async function main() {
  await client.connect()
}

export const client = new Client({
  connectionString: process.env.DATABASE_URL
})

export const db = drizzle(client, { schema })

main().catch(err => {
  console.error(err)
  process.exit(0)
})

