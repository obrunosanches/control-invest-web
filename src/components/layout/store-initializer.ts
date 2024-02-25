'use client'

import { type PropsWithChildren, useRef } from 'react'
import { useCIStore } from '@/hooks/control-invest-store-provider'
import { CIState } from '@/types/store'

function StoreInitializer({ children, ...state }: PropsWithChildren & Partial<CIState> ) {
  const initialized = useRef(false)
  const store = useCIStore(store => store)
  
  if (!initialized.current) {
    state.accountTypes && store.actions.setAccountTypes(state.accountTypes)
    state.accounts && store.actions.setAccounts(state.accounts)
    state.categories && store.actions.setCategories(state.categories)
    state.transactions && store.actions.setTransactions(state.transactions)
    state.transactionTypes && store.actions.setTransactionTypes(state.transactionTypes)
    
    initialized.current = true
  }
  
  return children
}

export default StoreInitializer