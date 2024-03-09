'use client'

import { useMemo, useState } from 'react'

import type { TransactionOptions } from '@/types/database'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import ButtonNewItem from '@/components/layout/button-new-item'
import ResultsByMonth from '@/components/layout/transaction/results-by-month'
import MonthYearSelected from '@/components/layout/transaction/month-year-selected'
import { fetchTransactions } from '@/services/transaction'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ContainerSheetForm from '@/components/layout/transaction/container-sheet-form'
import { fetchCategories } from '@/services/category'

function TransactionData() {
  const store = useCIStore((store) => store)
  const setCategories = useCIStore((store) => store.actions.setCategories)
  
  const [slugSelected, setSlug] = useState<TransactionOptions>('transaction')
  const transactionTypesDefault = store.getters.getDefaultTransactionTypes()
  
  const titleNewTransaction = useMemo(() => ({
    transaction: 'Transação',
    transfer: 'Transferência',
    earnings: 'Receita',
    expenses: 'Despesa'
  } as Record<TransactionOptions, any>), [])
  
  const handleSelectTransactionType = async (slug: TransactionOptions) => {
    setSlug(slug)
    
    const transactionType = store.getters.getTransactionTypeBySlug(slug)
    
    if (transactionType?.id) {
      const categories = await fetchCategories(transactionType.id)
      setCategories(categories)
    }
  }
  
  if (!store.accounts.length) {
    return null
  }
  
  return (
    <>
      <div className="flex justify-between mt-6">
        <Select
          onValueChange={handleSelectTransactionType}
          value={slugSelected}
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
          sheetTitle={titleNewTransaction[slugSelected]}
          pageSource="transaction"
          buttonTitle="Nova"
          disabled={slugSelected === 'transaction'}
        />
      </div>
      
      <ResultsByMonth />
      
      <div className="bg-slate-50 border border-black[0.07] rounded-2xl mt-4">
        <div className="px-6 py-6">
          <MonthYearSelected onDateSelected={async (month, year) => {
            const transactions = await fetchTransactions({ month, year })
            
            store.actions.setTransactions(transactions)
          }} />
        </div>
      </div>
      
      <ContainerSheetForm slug={slugSelected} />
    </>
  )
}

export default TransactionData