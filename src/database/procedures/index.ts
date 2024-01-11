import { client, db } from '@/database/connect'
import { sql } from 'drizzle-orm'

import { setAccountBalanceBeforeManipulateTransaction } from './setAccountBalanceBeforeManipulateTransaction'

async function main() {
  console.log('procedures started...')
  
  await db.execute(sql.raw(`${setAccountBalanceBeforeManipulateTransaction}`))
  console.log('create or update setAccountBalanceBeforeManipulateTransaction procedure...')
}

main().catch(err => {
  console.error(err)
}).finally(() => {
  console.log('procedures ended...')
  client.end()
  process.exit(0)
})