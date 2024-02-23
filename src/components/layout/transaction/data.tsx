'use client'

import { useCallback, useState } from 'react'

import type { TransactionOptions } from '@/types/database'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ButtonNewItem from '@/components/layout/button-new-item'
import ResultsByMonth from '@/components/layout/results-by-month'
import MonthYearSelected from '@/components/layout/month-year-selected'

function TransactionData() {
  const store = useCIStore((store) => store)
  
  const transactionTypesDefault = store.getters.getDefaultTransactionTypes()
  
  const [transactionTypeSelected, setSelectedTransactionType] = useState<TransactionOptions>('transaction')
  
  const handleSelectTransactionType = useCallback(async (slug: TransactionOptions) => setSelectedTransactionType(slug), [])
  
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
      
      {store.accounts.length ? <ResultsByMonth /> : null}
      
      <div className="bg-slate-50 border border-black[0.07] rounded-2xl mt-4">
        <div className="px-6 py-6">
          <MonthYearSelected onDateSelected={(month, year) => {
            console.log('month', month)
            console.log('year', year)
          }} />
        </div>
      </div>
    </>
  )
}

export default TransactionData