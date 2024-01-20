import { AccountTypeProps } from '@/types/schema'
import { StateCreator } from 'zustand'

export type SliceStateAccountTypes = {
  accountTypes: AccountTypeProps[]
}

export type SliceActionsAccountTypes = {
  setAccountTypes: (data: AccountTypeProps[]) => void
}

export interface SliceStoreAccountTypes {
  state: SliceStateAccountTypes,
  actions: SliceActionsAccountTypes
}

export const accountTypeSlice: StateCreator<SliceStoreAccountTypes> = (set) => ({
  state: {
    accountTypes: []
  },
  actions: {
    setAccountTypes: (data) =>
      set((state) => ({
        state: {
          ...state.state,
          accountTypes: data
        }
      }))
  }
})