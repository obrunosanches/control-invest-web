import { defineStore } from "pinia"

import type { Transaction } from ".prisma/client"

interface State {
  transactions: Transaction[]
}

export const useTransactionStore = defineStore('transactionStore', {
  state: (): State => ({
    transactions: []
  }),
  actions: {
    async fetchTransaction(month: string, year: string, typeId: string = null) {
      const currentDate = new Date()
      const queryParams = new URLSearchParams()
      
      queryParams.append('month', month ?? currentDate.getMonth().toString())
      queryParams.append('year', year ?? currentDate.getFullYear().toString())
      
      if (typeId) {
        typeId && queryParams.append('type', typeId)
      }
      
      try {
        this.transactions = await $fetch<Transaction[]>(`/api/transaction?${queryParams.toString()}`)
      } catch (error) {
        console.error(error)
      }
    }
  }
})