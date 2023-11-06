import { defineStore } from 'pinia'

import { useAccountTypesStore } from "~/store/accountType"

import type { Account, AccountType } from "@prisma/client"

export interface AccountWithIncludes extends Account {
  accountType: AccountType
}

interface State {
  accounts: AccountWithIncludes[]
}

export const useAccountStore = defineStore('accounts', {
  state: (): State => ({
    accounts: []
  }),
  actions: {
    async fetchAccounts() {
      try {
        this.accounts = await $fetch<AccountWithIncludes>('/api/accounts')
        
      } catch (error) {
        console.error(error)
      }
    },
    async createOrUpdateAccount(account: Account) {
      const { accountTypes } = useAccountTypesStore()
      const apiUrl = `/api/accounts${account.id ? `/${account.id}` : ''}`
      
      try {
        const response = await $fetch<Account>(apiUrl, {
          method: account.id ? 'PUT' : 'POST',
          body: {
            name: account.name,
            initialBalance: Number(account.initialBalance || 0),
            accountTypeId: account.accountTypeId
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        await this.fetchAccounts()
      }
    },
    async deleteAccount(accountId: string){
      try {
        await $fetch(`/api/accounts/${accountId}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      } finally {
        await this.fetchAccounts()
      }
    }
  }
})