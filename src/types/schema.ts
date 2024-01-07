import { account, accountType, category, subCategory, transactionType } from '@/database/schema'

export type AccountTypeProps = (typeof accountType.$inferInsert)
export type AccountProps = (typeof account.$inferInsert)
export type TransactionTypeProps = (typeof transactionType.$inferInsert)
export type CategoryProps = (typeof category.$inferInsert)
export type SubCategoryProps = (typeof subCategory.$inferInsert)