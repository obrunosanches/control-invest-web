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
    async fetchTransaction(month: string, year: string) {
      const currentDate = new Date()
      const query = {
        month: month ?? currentDate.getMonth().toString(),
        year: year ?? currentDate.getFullYear().toString()
      }
      
      try {
        this.transactions = await $fetch<Transaction[]>(`/api/transaction?month=${query.month}&year=${query.year}`)
      } catch (error) {
        console.error(error)
      }
    }
  }
})