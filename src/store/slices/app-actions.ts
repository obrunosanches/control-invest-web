import { StateCreator } from 'zustand'
import { produce } from 'immer'

import type {
  AccountTypeProps,
  AccountWithTypeProps,
  CategoryWithRelationsProps,
  TransactionTypeProps
} from '@/types/schema'
import type { SheetOption } from '@/store/slices/app-state'

export type AppStoreActions = {
  actions: {
    setAccountTypes: (data: AccountTypeProps[]) => void
    setAccounts: (data: AccountWithTypeProps[]) => void
    setCategories: (data: CategoryWithRelationsProps[]) => void
    setSheetToggle: (data: boolean) => void
    setSheetOptions: (data: SheetOption) => void
    setTransactionType: (data: TransactionTypeProps[]) => void
  }
}

export const appActionSlice: StateCreator<AppStoreActions> = (set) => ({
  actions: {
    setAccountTypes: (data) => {
      return set(produce(({ state }) => {
        state.accountTypes = data
      }))
    },
    setAccounts: (data) => {
      return set(produce(({ state }) => {
        state.accounts = data
      }))
    },
    setCategories: (data) => {
      return set(produce(({ state }) => {
        state.categories = data
      }))
    },
    setSheetToggle: (data) => {
      return set(produce(({ state }) => {
        state.sheet.toggle = data
      }))
    },
    setSheetOptions: (data) => {
      return set(produce(({ state }) => {
        state.sheet = { ...state.sheet, ...data }
      }))
    },
    setTransactionType: (data) => {
      return set(produce(({ state }) => {
        state.transactionTypes = data
      }))
    }
  }
})