import { StateCreator } from 'zustand'

import type {
  AccountTypeProps,
  AccountWithTypeProps,
  CategoryWithRelationsProps,
  TransactionTypeProps
} from '@/types/schema'
import type { PageActions } from '@/types/pages'

export type SheetOption = {
  action: PageActions
  selected: any
  title: string
}

export type AppStoreState = {
  state: {
    accountTypes: AccountTypeProps[]
    accounts: AccountWithTypeProps[]
    categories: CategoryWithRelationsProps[]
    sheet: SheetOption & {
      toggle: boolean
    }
    transactionTypes: TransactionTypeProps[]
  }
}

export const appStateSlice: StateCreator<AppStoreState> = (set) => ({
  state: {
    accountTypes: [],
    accounts: [],
    sheet: {
      action: 'new',
      toggle: false,
      title: '',
      selected: {}
    },
    categories: [],
    transactionTypes: []
  }
})