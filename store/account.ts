import { defineStore } from 'pinia'

import { useAccountTypesStore } from "~/store/accountType"

import type { Account, AccountType } from "@prisma/client"

export interface AccountWithType extends Account {
  accountType: AccountType
}

interface State {
  accounts: AccountWithType[]
}

export const useAccountStore = defineStore('accounts', {
  state: (): State => ({
    accounts: []
  }),
  actions: {
    async fetchAccounts() {
      try {
        this.accounts = await $fetch<AccountWithType>('/api/accounts')
        
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
        
        if (account.id) {
          return await this.fetchAccounts()
        }
        
        const accountType = accountTypes.find(
          type => type.id === response.accountTypeId
        )
        
        this.accounts.push({ ...response, accountType })
      } catch (error) {
        console.error(error)
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