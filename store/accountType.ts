import { defineStore } from "pinia"

import type { AccountType} from "@prisma/client"

interface State {
  accountTypes: AccountType[]
}

export const useAccountTypesStore = defineStore('account-types', {
  state: (): State => ({
    accountTypes: []
  }),
  actions: {
    async fetchAccountTypes(): Promise<void> {
      try {
        this.accountTypes = await $fetch<AccountType[]>('/api/accounts/types')
      } catch (error) {
        console.error(error)
      }
    }
  }
})
