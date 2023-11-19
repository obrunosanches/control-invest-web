import { defineStore } from "pinia"

import type { TransactionType } from "@prisma/client"
import type { TransactionTypesOptions } from "~/types"

interface State {
  transactionTypes: TransactionType[]
}

export const useTransactionTypeStore = defineStore('transactionTypeStore', {
  state: (): State => ({
    transactionTypes: []
  }),
  getters: {
    getDefaultTransactionTypes(state: State) {
      return () => state.transactionTypes.filter(type => !type.slug.includes('transfer'))
    },
    getTransactionType(state: State) {
      return (slug: TransactionTypesOptions) => state.transactionTypes.find(type => type.slug === slug)
    }
  },
  actions: {
    async fetchTransactionTypes() {
      try {
        this.transactionTypes = await $fetch<TransactionType[]>('/api/category/type')
      } catch (error) {
        console.error(error)
      }
    }
  }
})