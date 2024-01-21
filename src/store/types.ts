import type {
  SliceActionsAccounts,
  SliceActionsAccountTypes, SliceActionsGlobal,
  SliceStateAccounts,
  SliceStateAccountTypes,
  SliceStateGlobal,
  SliceStoreAccounts,
  SliceStoreAccountTypes,
  SliceStoreGlobal
} from '@/store/slices'

export type StoreState = SliceStateAccounts & SliceStateAccountTypes & SliceStateGlobal
export type StoreActions = SliceActionsAccounts & SliceActionsAccountTypes & SliceActionsGlobal
export type StoreProps = SliceStoreAccounts & SliceStoreAccountTypes & SliceStoreGlobal