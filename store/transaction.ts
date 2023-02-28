import {defineStore} from "pinia";
import {Account, Transaction} from "@prisma/client";
import {useAccountsStore} from "~/store/account";

export interface TransactionsWithAccount extends Transaction {
  account: Account
}

interface State {
  transactions: TransactionsWithAccount[]
}

export const useTransactionStore = defineStore('transaction', {
  state: (): State => ({
    transactions: []
  }),
  getters: {},
  actions: {
    async fetchTransactions({month, year, type = null}: { month: string, year: string, type: string | null }): Promise<void> {
      try {
        let transactionApiUrl = `/api/transaction?month=${month}&year=${year}`

        if (type) {
          transactionApiUrl += `&type=${type}`
        }

        this.transactions = await $fetch<TransactionsWithAccount[]>(transactionApiUrl)
      } catch (error) {
        console.error(error)
      }
    },
    async createTransaction(formData: FormData): Promise<void> {
      const { accounts } = useAccountsStore()
      const transactionData: Record<string, FormDataEntryValue> = Object.fromEntries(formData)

      const response = await $fetch<Transaction>('/api/transaction', {
        method: 'POST',
        body: transactionData
      })

      const account = accounts.find(
        item => item.id === response.accountId
      ) as Account

      const transactionsWithAccount: TransactionsWithAccount = { ...response, account }

      this.transactions.push(transactionsWithAccount)
    }
  }
})