import { Suspense } from 'react'

import TransactionData from '@/components/layout/transaction/data'

export default async function Transactions() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        Transações
      </h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionData />
      </Suspense>
    </>
  )
}
