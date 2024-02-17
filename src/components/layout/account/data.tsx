'use client'

import AccountForm from '@/components/layout/account/form'
import AccountList from '@/components/layout/account/list'
import ButtonNewItem from '@/components/layout/button-new-item'
import ConfirmDelete from '@/components/layout/confirm-delete'
import SheetForm from '@/components/layout/sheet-form'
import TransactionSheetForm from '@/components/layout/transaction/sheet-form'

import { createOrUpdateAccount, deleteAccount } from '@/services/account'

import type { AccountProps, AccountTypeProps, AccountWithTypeProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'
import { useCIStore } from '@/hooks/control-invest-store-provider'
import { useCallback, useEffect } from 'react'

interface AccountDataProps {
  accountsData: AccountWithTypeProps[]
  accountTypesData: AccountTypeProps[]
}

function AccountData({ accountsData, accountTypesData }: AccountDataProps) {
  const store = useCIStore((store) => store)
  const sheet = store.sheet
  const selected = store.sheet.selected as AccountWithTypeProps
  
  const storeData = useCallback(({ accounts, types }: { accounts: AccountWithTypeProps[], types: AccountTypeProps[] }) => {
    store.actions.setAccounts(accounts)
    store.actions.setAccountTypes(types)
  }, [store.actions])
  
  useEffect(() => storeData({ accounts: accountsData, types: accountTypesData }), [accountTypesData, accountsData, storeData])
  
  function getAccount() {
    if (selected.id) {
      return store.accounts.filter(item => item.id !== selected.id)
    }
    
    return store.accounts
  }
  
  async function handleActionDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteAccount(selected.id!)
      
      store.actions.setAccounts(getAccount())
    }
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    if (formData && formAction === 'confirm') {
      const account = await createOrUpdateAccount({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        initial_balance: formData.initial_balance,
        account_type_id: formData.account_type_id,
      })
      
      const type = store.accountTypes.find(type => type.id === account.account_type_id)
      
      store.actions.setAccounts([...getAccount(), { ...account, type }])
    }
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <>
      <ButtonNewItem sheetTitle="Conta" pageSource="account" buttonTitle="Adicionar conta" />
      <AccountList />
      
      {['earning', 'expense', 'transaction'].includes(sheet.action) ? (
        <TransactionSheetForm />
      ) : (
        <SheetForm>
          {['new', 'edit' as PageActions].includes(sheet.action) && (
            <AccountForm handleAction={handleActionForm} />
          )}
          
          {sheet.action === 'remove' && (
            <ConfirmDelete
              item={selected.name!}
              handleAction={handleActionDelete}
            />
          )}
        </SheetForm>
      )}
    </>
  )
}

export default AccountData
