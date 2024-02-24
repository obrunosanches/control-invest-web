import { createStore } from 'zustand/vanilla'

import type { CIState, CIStore } from '@/types/store'

export const initStateDefault: CIState = {
  accounts: [],
  accountTypes: [],
  categories: [],
  transactions: [],
  transactionTypes: []
}

export const createCIStore = (initState: CIState = initStateDefault) => {
  return createStore<CIStore>()((setState, getState) => ({
    ...initState,
    getters: {
      getDefaultTransactionTypes: () => {
        return getState().transactionTypes.filter(type => !type.slug.includes('transfer'))
      },
      getAccountBalance: () => {
        const accounts = getState().accounts
        
        return accounts.map(account => Number(account.balance) ?? 0).reduce((prev, value) => prev + value, 0)
      },
      getTransactionBalanceByType: (slug) => {
        const transactions = getState().transactions
        const transactionValues = transactions.map(transaction => transaction.type.slug === slug ? Number(transaction.value) : 0)
        
        return transactionValues.reduce((prev, value) => prev + value, 0)
      },
    },
    actions: {
      setAccounts: (data) => {
        return setState({ accounts: data })
      },
      setAccountTypes: (data) => {
        return setState({ accountTypes: data })
      },
      setCategories: (data) => {
        return setState({ categories: data })
      },
      setTransactionTypes: (data) => {
        return setState({ transactionTypes: data })
      }
    }
  }))
}
