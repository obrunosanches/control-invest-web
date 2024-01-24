'use client'

import { PropsWithChildren, useRef } from 'react'

import { useAppStore } from '@/store'
import {
  AccountTypeProps,
  AccountWithTypeProps,
  CategoryWithRelationsProps,
  TransactionTypeProps
} from '@/types/schema'

type StoreInitializerProps = {
  accounts: AccountWithTypeProps[]
  accountTypes: AccountTypeProps[]
  categories: CategoryWithRelationsProps[]
  transactionTypes: TransactionTypeProps[]
}

function StoreInitializer(props: PropsWithChildren & Partial<StoreInitializerProps>) {
  const initialized = useRef(false)
  const { actions } = useAppStore()
  const {
    accountTypes,
    transactionTypes,
    accounts,
    categories
  } = props
  
  
  if (!initialized.current) {
    accounts && actions.setAccounts(accounts)
    accountTypes && actions.setAccountTypes(accountTypes)
    categories && actions.setCategories(categories)
    transactionTypes && actions.setTransactionType(transactionTypes)
    
    initialized.current = true
  }
  
  return props.children
}

export default StoreInitializer
