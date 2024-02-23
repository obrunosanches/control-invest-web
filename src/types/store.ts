import type {
  AccountTypeProps,
  AccountWithTypeProps,
  CategoryWithRelationsProps,
  TransactionTypeProps, TransactionWithRelationsProps
} from '@/types/schema'
import { PageActions, PagesSources } from '@/types/pages'
import { TransactionSlug } from '@/types/database'

type SheetOption = {
  action: PageActions
  selected: any
  title: string
  pageSource: PagesSources | null
}

export type CIState = {
  accounts: AccountWithTypeProps[]
  accountTypes: AccountTypeProps[]
  categories: CategoryWithRelationsProps[]
  transactions: TransactionWithRelationsProps[]
  transactionTypes: TransactionTypeProps[]
  sheet: SheetOption & {
    toggle: boolean
  }
}

type CIActions = {
  actions: {
    setAccounts: (data: AccountWithTypeProps[]) => void
    setAccountTypes: (data: AccountTypeProps[]) => void
    setCategories: (data: CategoryWithRelationsProps[]) => void
    setTransactionTypes: (data: TransactionTypeProps[]) => void
    setSheetToggle: (data: boolean) => void
    setSheetOptions: (data: SheetOption) => void
  }
}

type CIGetters = {
  getters: {
    getDefaultTransactionTypes: () => TransactionTypeProps[]
    getAccountBalance: () => number
    getTransactionBalanceByType: (slug: TransactionSlug) => number
  }
}

export type CIStore = CIState & CIActions & CIGetters