import { defineStore } from "pinia"

import { useAccountStore } from "~/store/account"

import type { Account, Category, TransactionType, SubCategory, Transaction } from "@prisma/client"
import type { TransactionTypeSlug } from "~/types"
import { useTransactionTypeStore } from "~/store/transactionType"
import { useCategoryStore } from "~/store/category"

export interface TransactionWithIncludes extends Transaction {
  type: TransactionType
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

export interface CreateTransaction {
  accountFrom: string
  accountTo: string
  date: string
  description: string
  value: string
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
        
        const currentDate = new Date()
        const currentTimezoneOffset = currentDate.getTimezoneOffset() * 60000
        const currentDateWithoutTimezone = new Date(currentDate.valueOf() - currentTimezoneOffset)
        
        const transactionDateWithoutTimezone = new Date(transaction.date).toISOString().slice(0, -1)
        const transactionDate = new Date(transactionDateWithoutTimezone)
        
        await $fetch(apiUrl, {
          method: transaction.id ? 'PUT' : 'POST',
          body: {
            accountId: transaction.accountId,
            categoryId: transaction.categoryId,
            typeId: transaction.typeId,
            date: new Date(
              transactionDate.getFullYear(),
              transactionDate.getMonth(),
              transactionDate.getDate(),
              currentDateWithoutTimezone.getHours(),
              currentDateWithoutTimezone.getMinutes()
            ),
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
    async createTransfer(payload: CreateTransaction, filters: FetchTransactionFilter) {
      const { fetchCategoriesByType } = useCategoryStore()
      const { getTransactionType } = useTransactionTypeStore()
      
      const expenseTransferType = getTransactionType('expenses-transfer')
      const earningTransferType = getTransactionType('earnings-transfer')
      
      const expenseCategories = await fetchCategoriesByType(expenseTransferType?.id)
      const earningCategories = await fetchCategoriesByType(earningTransferType?.id)
      
      const expenseCategory = expenseCategories.find(() => true)
      const expenseSubCategory = expenseCategory?.subCategory.find(() => true)
      
      const earningCategory = earningCategories.find(() => true)
      const earningSubCategory = earningCategory?.subCategory.find(() => true)
      
      await this.createTransaction({
        accountId: payload.accountFrom,
        categoryId: expenseCategory?.id,
        date: payload.date,
        description: payload.description,
        typeId: expenseTransferType?.id,
        subCategoryId: expenseSubCategory?.id,
        value: payload.value
      }, filters)
      
      await this.createTransaction({
        accountId: payload.accountTo,
        categoryId: earningCategory?.id,
        date: payload.date,
        description: payload.description,
        typeId: earningTransferType?.id,
        subCategoryId: earningSubCategory?.id,
        value: payload.value
      }, filters)
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