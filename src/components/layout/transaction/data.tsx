'use client'

import { useCallback, useMemo, useState } from 'react'

import type { TransactionOptions } from '@/types/database'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { fetchAccounts } from '@/services/account'
import { fetchTransactions } from '@/services/transaction'
import { fetchCategories } from '@/services/category'

import ButtonNewItem from '@/components/layout/button-new-item'
import ResultsByMonth from '@/components/layout/transaction/results-by-month'
import MonthYearSelected from '@/components/layout/transaction/month-year-selected'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ContainerSheetForm from '@/components/layout/transaction/container-sheet-form'
import TransactionList from '@/components/layout/transaction/list'

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
  
  const refreshTransactions = useCallback(() => {
    new Promise(async (resolve) => {
      const transactions = await fetchTransactions(store.transactionFilters)
      const accounts = await fetchAccounts()
      
      store.actions.setTransactions(transactions)
      store.actions.setAccounts(accounts)
      
      resolve([transactions, accounts])
    }).catch(e => console.log(e))
  },[store.actions.setTransactions, store.actions.setAccounts])
  
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
            store.actions.setTransactionFilter({
              month,
              year
            })
          }} />
        </div>
        
        <TransactionList />
      </div>
      
      <ContainerSheetForm
        slug={slugSelected}
        onConfirm={refreshTransactions}
      />
    </>
  )
}

export default TransactionData