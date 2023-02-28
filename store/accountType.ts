import {defineStore} from "pinia";
import {AccountType} from "@prisma/client";

interface State {
  accountTypes: AccountType[]
}

export const useAccountTypesStore = defineStore('account-types', {
  state: (): State => ({
    accountTypes: []
  }),
  getters: {},
  actions: {
    async fetchAccountTypes(): Promise<void> {
      try {
        this.accountTypes = await $fetch<AccountType[]>('/api/account/type')
      } catch (error) {
        console.error(error)
      }
    },
    async createAccountType(formData: FormData): Promise<void> {
      const accountTypeData: Record<string, FormDataEntryValue> = Object.fromEntries(formData)

      try {
        const categoryType = await $fetch<AccountType>('/api/account/type', {
          method: 'POST',
          body: accountTypeData
        })

        this.accountTypes.push(categoryType)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
