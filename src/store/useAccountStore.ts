import { create } from 'zustand'

import type { AccountWithTypeProps } from '@/types/schema'

type State = {
  accounts: AccountWithTypeProps[]
}

type Actions = {
  actions: {
    setAccounts: (data: AccountWithTypeProps[]) => void
  }
}

type Getters = {
  getters: {}
}

export const useAccountStore = create<State & Actions & Getters>()((set) => ({
  accounts: [],
  getters: {},
  actions: {
    setAccounts: (data) => {
      return set({ accounts: data })
    }
  }
}))
