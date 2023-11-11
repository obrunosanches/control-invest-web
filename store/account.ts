import { defineStore } from 'pinia'

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
      const apiUrl = `/api/accounts${account.id ? `/${account.id}` : ''}`
      const accountData: Account = {
        name: account.name,
        accountTypeId: account.accountTypeId
      }
      
      if (!account.id) {
        accountData.initialBalance = Number(account.initialBalance || 0)
        accountData.balance = Number(account.initialBalance || 0)
      }
      
      try {
        await $fetch<Account>(apiUrl, {
          method: account.id ? 'PUT' : 'POST',
          body: accountData
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