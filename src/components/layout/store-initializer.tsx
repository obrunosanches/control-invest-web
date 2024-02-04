'use client'

import { PropsWithChildren, useRef } from 'react'

import { useTransactionTypeStore } from '@/store/useTransactionStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useAccountStore } from '@/store/useAccountStore'
import { useAccountTypeStore } from '@/store/useAccountTypeStore'

import type {
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
  const { actions: accountActions } = useAccountStore()
  const { actions: accountTypeActions } = useAccountTypeStore()
  const { actions: categoryActions } = useCategoryStore()
  const { actions: transactionTypeActions } = useTransactionTypeStore()
  const {
    accountTypes,
    transactionTypes,
    accounts,
    categories
  } = props
  
  
  if (!initialized.current) {
    accounts && accountActions.setAccounts(accounts)
    accountTypes && accountTypeActions.setAccountTypes(accountTypes)
    categories && categoryActions.setCategories(categories)
    transactionTypes &&  transactionTypeActions.setTransactionTypes(transactionTypes)
    
    initialized.current = true
  }
  
  return props.children
}

export default StoreInitializer
