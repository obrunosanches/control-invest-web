import { client, db } from '@/database/connect'
import { sql } from 'drizzle-orm'

import { setAccountBalance } from './setAccountBalance'

async function main() {
  console.log('triggers started...')
  
  await db.execute(sql.raw(`${setAccountBalance}`))
  console.log('create or update setAccountBalance trigger...')
}

main().catch(err => {
  console.error(err)
}).finally(() => {
  console.log('triggers ended...')
  client.end()
  process.exit(0)
})