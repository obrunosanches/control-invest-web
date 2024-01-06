import 'dotenv/config'
import { sql } from 'drizzle-orm'

import { db, client } from './connect'
import { account, accountType, category, subCategory, transactionType } from './schema'
import { accountTypesSeed, getAccountsSeed, getCategorySeed, getSubCategorySeed, transactionTypesSeed } from './seeds/values'

async function main() {
  console.log('Seed started...')
  await db.delete(accountType)
  await db.delete(account)
  await db.delete(transactionType)
  
  await db.execute(sql`ALTER SEQUENCE account_type_id_seq RESTART;`)
  await db.execute(sql`ALTER SEQUENCE account_id_seq RESTART;`)
  await db.execute(sql`ALTER SEQUENCE transaction_type_id_seq RESTART;`)
  await db.execute(sql`ALTER SEQUENCE category_id_seq RESTART;`)
  await db.execute(sql`ALTER SEQUENCE sub_category_id_seq RESTART;`)
  await db.execute(sql`ALTER SEQUENCE transaction_id_seq RESTART;`)
  
  // account type
  const accountTypes = await db.insert(accountType).values(accountTypesSeed).returning()
  
  // account
  const accountsSeed = getAccountsSeed(accountTypes)
  await db.insert(account).values(accountsSeed).execute()
  
  // account transaction type
  const transactionTypes = await db.insert(transactionType).values(transactionTypesSeed).returning()
  
  // category
  const categoriesSeed = getCategorySeed(transactionTypes)
  const categories = await db.insert(category).values(categoriesSeed).returning()
  
  // sub category
  const subCategoriesSeed = getSubCategorySeed(categories)
  await db.insert(subCategory).values(subCategoriesSeed).execute()
}

main().catch(err => {
  console.error(err)
}).finally(() => {
  console.log('Seed ended...')
  client.end()
  process.exit(0)
})