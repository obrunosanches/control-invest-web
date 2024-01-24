import { Suspense } from 'react'

import { request } from '@/server/request'

import AccountData from '@/components/layout/account/data'
import StoreInitializer from '@/components/layout/store-initializer'

async function AccountInitializer() {
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
  const { accountTypes, accounts } = await AccountInitializer()
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        Contas
      </h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <StoreInitializer
          accountTypes={accountTypes}
          accounts={accounts}
        >
          <AccountData />
        </StoreInitializer>
      </Suspense>
    </>
  )
}
