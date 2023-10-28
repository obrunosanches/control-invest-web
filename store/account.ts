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
    async fetchAccounts(): Promise<void> {
      try {
        this.accounts = await $fetch<AccountWithType>('/api/accounts')
        
      } catch (error) {
        console.error(error)
      }
    },
    async createAccount(account: Account): Promise<void> {
      const { accountTypes } = useAccountTypesStore()
      const accountData: Pick<Account, 'name' | 'accountTypeId' | 'initialBalance'> = account
      
      try {
        const response = await $fetch<Account>('/api/accounts', {
          method: 'POST',
          body: accountData
        })

        const accountType = accountTypes.find(
          type => type.id === response.accountTypeId
        ) as AccountType

        this.accounts.push({ ...response, accountType })
      } catch (error) {
        console.error(error)
      }
    }
  }
})