import type {
  AccountTypeProps,
  AccountWithTypeProps,
  CategoryWithRelationsProps,
  TransactionTypeProps
} from '@/types/schema'
import { PageActions, PagesSources } from '@/types/pages'

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
  }
}

export type CIStore = CIState & CIActions & CIGetters