import { create } from 'zustand'

import type { TransactionTypeProps } from '@/types/schema'

type State = {
  transactionTypes: TransactionTypeProps[]
}

type Actions = {
  actions: {
    setTransactionTypes: (data: TransactionTypeProps[]) => void
  }
}

type Getters = {
  getters: {
    getDefaultTransactionTypes: () => TransactionTypeProps[]
  }
}

export const useTransactionTypeStore = create<State & Actions & Getters>()((set, get) => ({
  transactionTypes: [],
  getters: {
    getDefaultTransactionTypes: () => {
      return get().transactionTypes.filter(type => !type.slug.includes('transfer'))
    },
  },
  actions: {
    setTransactionTypes: (data) => {
      return set({ transactionTypes: data })
    }
  }
}))
