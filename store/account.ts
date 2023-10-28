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
    async createAccount(formData: FormData): Promise<void> {
      const { accountTypes } = useAccountTypesStore()
      const accountData: Account = Object.fromEntries(formData)
      
      try {
        const response = await $fetch<Account>('/api/accounts', {
          method: 'POST',
          body: {
            ...accountData,
            initialBalance: Number(accountData.initialBalance)
          }
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