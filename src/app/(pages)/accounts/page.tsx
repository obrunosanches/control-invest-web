import { Suspense } from 'react'

import { request } from '@/server/request'

import AccountData from '@/components/layout/account/data'

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
  const { accounts, accountTypes } = await AccountInitializer()
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        Contas
      </h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <AccountData accountsData={accounts} accountTypesData={accountTypes} />
      </Suspense>
    </>
  )
}
