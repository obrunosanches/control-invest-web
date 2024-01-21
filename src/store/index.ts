import { create } from 'zustand'

import { globalSlice, accountSlice, accountTypeSlice } from '@/store/slices'
import { StoreProps } from '@/store/types'

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
