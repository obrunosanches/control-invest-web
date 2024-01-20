import { request } from '@/server/request'

import { useAppStore } from '@/store'

import AccountData from '@/components/layout/account/data'
import StoreInitializer from '@/components/layout/store-initializer'

import type { AccountTypeProps, AccountWithTypeProps } from '@/types/schema'

async function fetchAccountData(): Promise<{
  accounts: AccountWithTypeProps[]
  accountTypes: AccountTypeProps[]
}> {
  const accountsResponse = await request('/account', { cache: 'no-store' })
  const accountTypesResponse = await request('/account-type', { cache: 'no-store' })
  
  const accounts = await accountsResponse.json()
  const accountTypes = await accountTypesResponse.json()
  
  return {
    accounts,
    accountTypes
  }
}

export default async function Accounts() {
  const { accounts, accountTypes } = await fetchAccountData()
  
  useAppStore.setState({
    state: {
      ...useAppStore.getState().state,
      accounts,
      accountTypes
    }
  })
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        Contas
      </h1>
      
      <StoreInitializer state={useAppStore.getState().state}  />
      <AccountData />
    </>
  )
}
