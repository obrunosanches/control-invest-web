import {defineStore} from "pinia";
import {Transaction} from "@prisma/client";

interface State {
  transactions: Transaction[]
  itemSelected: Transaction | {}
}

export const useTransactionStore = defineStore('transaction', {
  state: (): State => ({
    transactions: [],
    itemSelected: {}
  }),
  getters: {},
  actions: {
    async fetch({month, year, type = null}: { month: string, year: string, type: string | null }): Promise<void> {
      try {
        let transactionApiUrl = `/api/transaction?month=${month}&year=${year}`

        if (type) {
          transactionApiUrl += `&type=${type}`
        }

        this.transactions = await $fetch<Transaction[]>(transactionApiUrl)
      } catch (error) {
        console.error(error)
      }
    },
    async create(formData: FormData): Promise<void> {
      const transactionData: Record<string, FormDataEntryValue> = Object.fromEntries(formData)

      const transaction = await $fetch<Transaction>('/api/transaction', {
        method: 'POST',
        body: transactionData
      })

      this.transactions.push(transaction)
    }
  }
})