'use client'

import { useCallback, useState } from 'react'

import type { TransactionOptions } from '@/types/database'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ButtonNewItem from '@/components/layout/button-new-item'
import ResultsByMonth from '@/components/layout/ResultsByMonth'
import { createCIStore } from '@/store/control-invest-store'

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
        
        <ButtonNewItem sheetTitle="Transação" pageSource="transaction" buttonTitle="Nova" />
      </div>
      
      <ResultsByMonth />
    </>
  )
}

export default TransactionData