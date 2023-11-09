import { defineStore } from "pinia"

import type { Transaction } from ".prisma/client"

interface State {
  transactions: Transaction[]
}

export interface FetchTransactionFilter {
  month: string
  year: string
  typeId: string
}

export const useTransactionStore = defineStore('transactionStore', {
  state: (): State => ({
    transactions: []
  }),
  actions: {
    async fetchTransaction(filters: FetchTransactionFilter) {
      const currentDate = new Date()
      const queryParams = new URLSearchParams()
      
      queryParams.append('month', filters.month ?? currentDate.getMonth().toString())
      queryParams.append('year', filters.year ?? currentDate.getFullYear().toString())
      
      if (filters.typeId) {
        queryParams.append('type', filters.typeId)
      }
      
      try {
        this.transactions = await $fetch<Transaction[]>(`/api/transaction?${queryParams.toString()}`)
      } catch (error) {
        console.error(error)
      }
    },
    async createTransaction(transaction: Transaction, filters: FetchTransactionFilter) {
      try {
        const apiUrl = `/api/transaction${transaction.id ? `/${transaction.id}` : ''}`
        
        await $fetch(apiUrl, {
          method: transaction.id ? 'PUT' : 'POST',
          body: {
            accountId: transaction.accountId,
            categoryId: transaction.categoryId,
            categoryTypeId: transaction.categoryTypeId,
            date: new Date(transaction.date),
            description: transaction.description,
            subCategoryId: transaction.subCategoryId,
            value: parseFloat(transaction.value),
            isActive: true,
            mustIgnore: false
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        await this.fetchTransaction(filters)
      }
    }
  }
})