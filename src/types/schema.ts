import { account, accountType, category, subCategory, transaction, transactionType, transfer } from '@/database/schema'

export type AccountTypeProps = (typeof accountType.$inferInsert)
export type AccountProps = (typeof account.$inferInsert)
export type TransactionTypeProps = (typeof transactionType.$inferInsert)
export type CategoryProps = (typeof category.$inferInsert)
export type SubCategoryProps = (typeof subCategory.$inferInsert)
export type TransferProps = (typeof transfer.$inferInsert)
export type TransactionProps = (typeof transaction.$inferInsert)

export interface AccountWithTypeProps extends AccountProps {
  type: AccountTypeProps
}

export interface TransactionWithRelationsProps extends TransactionProps {
  type: TransactionTypeProps
  category: CategoryProps
  subCategory: SubCategoryProps
  account: AccountProps
  transfer: TransferProps
}

