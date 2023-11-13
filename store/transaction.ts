import { defineStore } from "pinia"

import type { Account, Category, CategoryType, SubCategory, Transaction } from "@prisma/client"
import type { CategoryTypeSlug } from "~/types"
import { useAccountStore } from "~/store/account"

export interface TransactionWithIncludes extends Transaction {
  type: CategoryType
  category: Category
  subCategory: SubCategory
  account: Account
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
      return (slug: CategoryTypeSlug) => {
        return state.transactions
          .map(transaction => transaction.type.slug === slug ? transaction.value : 0)
          .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      }
    },
    getTransactionsByCategoryType(state: State) {
      return (categoryTypeId: string) => {
        if (!categoryTypeId) {
          return state.transactions
        }
        
        return state.transactions.filter((transaction) => transaction.categoryTypeId === categoryTypeId)
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
    },
    async deleteTransaction(transaction: Transaction, filters: FetchTransactionFilter) {
      try {
        await $fetch(`/api/transaction/${transaction.id}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      } finally {
        await this.fetchTransaction(filters)
      }
    }
  }
})