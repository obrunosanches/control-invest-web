import { create } from 'zustand'

import type { AccountTypeProps } from '@/types/schema'

type State = {
  accountTypes: AccountTypeProps[]
}

type Actions = {
  actions: {
    setAccountTypes: (data: AccountTypeProps[]) => void
  }
}

type Getters = {
  getters: {}
}

export const useAccountTypeStore = create<State & Actions & Getters>()((set) => ({
  accountTypes: [],
  getters: {},
  actions: {
    setAccountTypes: (data) => {
      return set({ accountTypes: data })
    }
  }
}))
