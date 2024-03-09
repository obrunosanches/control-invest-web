import type {
  AccountTypeProps,
  AccountWithTypeProps,
  CategoryWithRelationsProps, SubCategoryProps,
  TransactionTypeProps, TransactionWithRelationsProps
} from '@/types/schema'
import { TransactionOptions, TransactionSlug } from '@/types/database'

export type CIState = {
  accounts: AccountWithTypeProps[]
  accountTypes: AccountTypeProps[]
  categories: CategoryWithRelationsProps[]
  transactions: TransactionWithRelationsProps[]
  transactionTypes: TransactionTypeProps[]
}

type CIActions = {
  actions: {
    setAccounts: (data: AccountWithTypeProps[]) => void
    setAccountTypes: (data: AccountTypeProps[]) => void
    setCategories: (data: CategoryWithRelationsProps[]) => void
    setTransactions: (data: TransactionWithRelationsProps[]) => void
    setTransactionTypes: (data: TransactionTypeProps[]) => void
  }
}

type CIGetters = {
  getters: {
    getDefaultTransactionTypes: () => TransactionTypeProps[]
    getAccountBalance: () => number
    getTransactionBalanceByType: (slug: TransactionSlug) => number
    getTransactionTypeBySlug: (slug: TransactionOptions) => TransactionTypeProps | null
    getSubCategoriesByCategory: (categoryId: number) => SubCategoryProps[]
  }
}

export type CIStore = CIState & CIActions & CIGetters