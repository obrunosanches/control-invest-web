import { AccountWithTypeProps } from '@/types/schema'
import { StateCreator } from 'zustand'

export type SliceStateAccounts = {
  accounts: AccountWithTypeProps[]
}

export type SliceActionsAccounts = {
  setAccounts: (data: AccountWithTypeProps[]) => void
}

export interface SliceStoreAccounts {
  state: SliceStateAccounts,
  actions: SliceActionsAccounts
}

export const accountSlice: StateCreator<SliceStoreAccounts> = (set) => ({
  state: {
    accounts: []
  },
  actions: {
    setAccounts: (data) =>
      set((state) => ({
        state: {
          ...state.state,
          accounts: [...state.state.accounts, ...data]
        }
      }))
  }
})