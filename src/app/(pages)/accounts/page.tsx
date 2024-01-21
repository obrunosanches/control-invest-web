import { request } from '@/server/request'

import { useAppStore } from '@/store'

import AccountData from '@/components/layout/account/data'
import StoreInitializer from '@/components/layout/store-initializer'

async function fetchAccountData(): Promise<void> {
  const accountsResponse = await request('/account', { cache: 'no-store' })
  const accountTypesResponse = await request('/account-type', { cache: 'no-store' })
  
  const accounts = await accountsResponse.json()
  const accountTypes = await accountTypesResponse.json()
  
  useAppStore.setState({
    state: {
      ...useAppStore.getState().state,
      accounts,
      accountTypes
    }
  })
}

export default async function Accounts() {
  await fetchAccountData()
  
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
