import {defineStore} from "pinia";
import {Account, AccountType} from "@prisma/client";
import {useAccountTypesStore} from "~/store/accountType";

export interface AccountWithType extends Account {
  accountType: AccountType;
}

interface State {
  accounts: AccountWithType[]
}

export const useAccountsStore = defineStore('accounts', {
  state: (): State => ({
    accounts: []
  }),
  getters: {},
  actions: {
    async fetchAccounts(): Promise<void> {
      try {
        this.accounts = await $fetch<AccountWithType[]>('/api/account')
      } catch (error) {
        console.error(error)
      }
    },
    async createAccounts(formData: FormData): Promise<void> {
      const {accountTypes} = useAccountTypesStore()
      const accountData: Record<string, FormDataEntryValue> = Object.fromEntries(formData)

      try {
        const response = await $fetch<Account>('/api/account', {
          method: 'POST',
          body: accountData
        })

        const accountType = accountTypes.find(
          type => type.id === response.accountTypeId
        ) as AccountType

        const accountWithType: AccountWithType = {...response, accountType}

        this.accounts.push(accountWithType)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
