import { createStore } from 'zustand/vanilla'

import type { CIState, CIStore } from '@/types/store'

export const initStateDefault: CIState = {
  accounts: [],
  accountTypes: [],
  categories: [],
  transactionTypes: [],
  sheet: {
    action: 'new',
    toggle: false,
    title: '',
    selected: {},
    pageSource: null
  },
}

export const createCIStore = (initState: CIState = initStateDefault) => {
  return createStore<CIStore>()((setState, getState) => ({
    ...initState,
    getters: {
      getDefaultTransactionTypes: () => {
        return getState().transactionTypes.filter(type => !type.slug.includes('transfer'))
      }
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
      },
      setSheetToggle: (data) => {
        return setState({
          sheet: {
            ...getState().sheet,
            toggle: data
          }
        })
      },
      setSheetOptions: (data) => {
        return setState({
          sheet: {
            ...getState().sheet,
            ...data
          }
        })
      },
    }
  }))
}
