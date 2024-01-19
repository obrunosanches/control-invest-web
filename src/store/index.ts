import { create } from 'zustand'

import {
  accountSlice,
  SliceActionsAccounts,
  SliceStateAccounts,
  type SliceStoreAccounts
} from '@/store/slices/accounts'
import {
  accountTypeSlice,
  SliceActionsAccountTypes,
  SliceStateAccountTypes,
  type SliceStoreAccountTypes
} from '@/store/slices/account-types'

export type StoreState = SliceStateAccounts & SliceStateAccountTypes
export type StoreActions = SliceActionsAccounts & SliceActionsAccountTypes
export type StoreProps = SliceStoreAccounts & SliceStoreAccountTypes

export const useAppStore = create<StoreProps>()((...props) => ({
    state: {
      ...accountSlice(...props).state,
      ...accountTypeSlice(...props).state
    },
    actions: {
      ...accountSlice(...props).actions,
      ...accountTypeSlice(...props).actions
    }
  })
)
