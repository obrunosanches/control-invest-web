import 'dotenv/config'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { db, client } from './connect'

async function main() {
  console.log('Migration started...')
  
  await migrate(db, { migrationsFolder: './drizzle' })
}

main().catch(err => {
  console.error(err)
}).finally(() => {
  console.log('Migration ended...')
  client.end()
  process. exit(0)
})

