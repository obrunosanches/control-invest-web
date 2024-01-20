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
import { globalSlice, SliceActionsGlobal, SliceStateGlobal, SliceStoreGlobal } from '@/store/slices/global'

export type StoreState = SliceStateAccounts & SliceStateAccountTypes & SliceStateGlobal
export type StoreActions = SliceActionsAccounts & SliceActionsAccountTypes & SliceActionsGlobal
export type StoreProps = SliceStoreAccounts & SliceStoreAccountTypes & SliceStoreGlobal

export const useAppStore = create<StoreProps>()((...props) => ({
    state: {
      ...accountSlice(...props).state,
      ...accountTypeSlice(...props).state,
      ...globalSlice(...props).state
    },
    actions: {
      ...accountSlice(...props).actions,
      ...accountTypeSlice(...props).actions,
      ...globalSlice(...props).actions
    }
  })
)
