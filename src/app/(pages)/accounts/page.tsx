import { request } from '@/server/request'

import type { AccountTypeProps, AccountWithTypeProps } from '@/types/schema'
import AccountData from '@/components/layout/account/data'

async function getAccount(): Promise<AccountWithTypeProps[]> {
  const response = await request('/account', {
    cache: 'no-store'
  })
  return await response.json()
}

async function getAccountTypes(): Promise<AccountTypeProps[]> {
  const response = await request('/account-type', {
    cache: 'no-store'
  })
  return await response.json()
}

export default async function Accounts() {
  const accounts = await getAccount()
  const accountTypes = await getAccountTypes()
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        Contas
      </h1>
      
      <AccountData
        accounts={accounts}
        accountTypes={accountTypes}
      />
    </>
  )
}
