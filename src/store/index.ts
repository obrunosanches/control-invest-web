import { create } from 'zustand'

import { type AppStoreState, appStateSlice } from '@/store/slices/app-state'
import { type AppStoreActions, appActionSlice } from '@/store/slices/app-actions'

export type StoreProps = AppStoreState & AppStoreActions

export const useAppStore = create<StoreProps>()((...props) => ({
  ...appStateSlice(...props),
  ...appActionSlice(...props)
}))
