'use client'

import { useState } from 'react'

import type { TransactionOptions } from '@/types/database'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import ButtonNewItem from '@/components/layout/button-new-item'
import ResultsByMonth from '@/components/layout/transaction/results-by-month'
import MonthYearSelected from '@/components/layout/transaction/month-year-selected'
import { fetchTransactions } from '@/services/transaction'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ContainerSheetForm from '@/components/layout/transaction/container-sheet-form'

function TransactionData() {
  const store = useCIStore((store) => store)
  
  const [transactionTypeSelected, setSelectedTransactionType] = useState<TransactionOptions>('transaction')
  
  const transactionTypesDefault = store.getters.getDefaultTransactionTypes()
  
  const handleSelectTransactionType = (slug: TransactionOptions) => setSelectedTransactionType(slug)
  
  if (!store.accounts.length) {
    return null
  }
  
  console.log('transactionTypeSelected', transactionTypeSelected)
  
  return (
    <>
      <div className="flex justify-between mt-6">
        <Select
          onValueChange={handleSelectTransactionType}
          value={transactionTypeSelected}
          aria-label="Categories type"
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transaction"> Transações </SelectItem>
            
            {transactionTypesDefault.map((type) => (
              <SelectItem key={type.id} value={type.slug}>
                {type.description}
              </SelectItem>
            ))}
            
            <SelectItem value="transfer"> Transferência </SelectItem>
          </SelectContent>
        </Select>
        
        <ButtonNewItem
          sheetTitle="Transação"
          pageSource="transaction"
          buttonTitle="Nova"
          disabled={transactionTypeSelected === 'transaction'}
        />
      </div>
      
      <ResultsByMonth />
      
      <div className="bg-slate-50 border border-black[0.07] rounded-2xl mt-4">
        <div className="px-6 py-6">
          <MonthYearSelected onDateSelected={async (month, year) => {
            const transactionType = store.transactionTypes.find(({ slug }) => slug === transactionTypeSelected)
            const transactions = await fetchTransactions({ month, year, typeId: transactionType?.id })
            
            store.actions.setTransactions(transactions)
          }} />
        </div>
      </div>
      
      <ContainerSheetForm />
    </>
  )
}

export default TransactionData