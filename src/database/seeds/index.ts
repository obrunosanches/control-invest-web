import 'dotenv/config'
import { sql } from 'drizzle-orm'

import { db, client } from '../connect'
import { account, accountType, category, subCategory, transactionType } from '../schema'
import { accountTypesSeed, getAccountsSeed, getCategorySeed, getSubCategorySeed, transactionTypesSeed } from './values'

async function main() {
  console.log('seeds started...')
  await db.delete(accountType).execute().finally(() =>
    console.log('delete account_type')
  )
  await db.delete(account).execute().finally(() =>
    console.log('delete account')
  )
  await db.delete(transactionType).execute().finally(() =>
    console.log('delete transaction_type')
  )
  
  await db.execute(sql`ALTER SEQUENCE account_type_id_seq RESTART;`).finally(() =>
    console.log('reset sequence account_type')
  )
  await db.execute(sql`ALTER SEQUENCE account_id_seq RESTART;`).finally(() =>
    console.log('reset sequence account_type')
  )
  await db.execute(sql`ALTER SEQUENCE transaction_type_id_seq RESTART;`).finally(() =>
    console.log('reset sequence transaction_type')
  )
  await db.execute(sql`ALTER SEQUENCE category_id_seq RESTART;`).finally(() =>
    console.log('reset sequence category')
  )
  await db.execute(sql`ALTER SEQUENCE sub_category_id_seq RESTART;`).finally(() =>
    console.log('reset sequence sub_category')
  )
  await db.execute(sql`ALTER SEQUENCE transaction_id_seq RESTART;`).finally(() =>
    console.log('reset sequence transaction')
  )
  
  // account type
  const accountTypes = await db.insert(accountType).values(accountTypesSeed).returning().finally(() =>
    console.log('seed account_type')
  )
  
  // account
  const accountsSeed = getAccountsSeed(accountTypes)
  await db.insert(account).values(accountsSeed).execute().finally(() =>
    console.log('seed account')
  )
  
  // account transaction type
  const transactionTypes = await db.insert(transactionType).values(transactionTypesSeed).returning().finally(() =>
    console.log('seed transaction_type')
  )
  
  // category
  const categoriesSeed = getCategorySeed(transactionTypes)
  const categories = await db.insert(category).values(categoriesSeed).returning().finally(() =>
    console.log('seed category')
  )
  
  // sub category
  const subCategoriesSeed = getSubCategorySeed(categories)
  await db.insert(subCategory).values(subCategoriesSeed).execute().finally(() =>
    console.log('seed sub_category')
  )
}

main().catch(err => {
  console.error(err)
}).finally(() => {
  console.log('seeds ended...')
  client.end()
  process.exit(0)
})