import { Suspense } from 'react'

import AccountData from '@/components/layout/account/data'

export default async function Accounts() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        Contas
      </h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <AccountData />
      </Suspense>
    </>
  )
}
