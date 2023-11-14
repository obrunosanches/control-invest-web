import { defineStore } from "pinia"

import { useAccountStore } from "~/store/account"

import type { Account, Category, TransactionType, SubCategory, Transaction } from "@prisma/client"
import type { TransactionTypeSlug } from "~/types"

export interface TransactionWithIncludes extends Transaction {
  type: TransactionType
  category: Category
  subCategory: SubCategory
  accountFrom: Account
  accountTo?: Account
}

interface State {
  transactions: TransactionWithIncludes[]
}

export interface FetchTransactionFilter {
  month: string
  year: string
  typeId?: string
}

export const useTransactionStore = defineStore('transactionStore', {
  state: (): State => ({
    transactions: []
  }),
  getters: {
    getTransactionBalance(state: State) {
      return (slug: TransactionTypeSlug) => {
        return state.transactions
          .map(transaction => transaction.type.slug === slug ? transaction.value : 0)
          .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      }
    },
    getTransactionsByTransactionType(state: State) {
      return (typeId: string) => {
        if (!typeId) {
          return state.transactions
        }
        
        return state.transactions.filter((transaction) => transaction.typeId === typeId)
      }
    }
  },
  actions: {
    async fetchTransaction(filters: FetchTransactionFilter) {
      const currentDate = new Date()
      const queryParams = new URLSearchParams()
      
      queryParams.append('month', filters.month ?? currentDate.getMonth().toString())
      queryParams.append('year', filters.year ?? currentDate.getFullYear().toString())
      
      try {
        this.transactions = await $fetch<Transaction[]>(`/api/transaction?${queryParams.toString()}`)
      } catch (error) {
        console.error(error)
      }
    },
    async createTransaction(transaction: Transaction, filters: FetchTransactionFilter) {
      const { fetchAccounts } = useAccountStore()
      
      try {
        const apiUrl = `/api/transaction${transaction.id ? `/${transaction.id}` : ''}`
        
        await $fetch(apiUrl, {
          method: transaction.id ? 'PUT' : 'POST',
          body: {
            accountFromId: transaction.accountFromId,
            categoryId: transaction.categoryId,
            typeId: transaction.typeId,
            date: transaction.date,
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
        await fetchAccounts()
        await this.fetchTransaction(filters)
      }
    },
    async deleteTransaction(transaction: Transaction, filters: FetchTransactionFilter) {
      const { fetchAccounts } = useAccountStore()
      
      try {
        await $fetch(`/api/transaction/${transaction.id}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      } finally {
        await fetchAccounts()
        await this.fetchTransaction(filters)
      }
    }
  }
})