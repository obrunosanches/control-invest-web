import { Suspense } from 'react'

import TransactionData from '@/components/layout/transaction/data'

export default async function Transactions() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionData />
    </Suspense>
  )
}
