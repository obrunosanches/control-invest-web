'use client'

import AccountForm from '@/components/layout/account/form'
import AccountList from '@/components/layout/account/list'
import ButtomNewItem from '@/components/layout/buttom-new-item'
import ConfirmDelete from '@/components/layout/confirm-delete'
import SheetForm from '@/components/layout/sheet-form'
import TransactionSheetForm from '@/components/layout/transaction/sheet-form'

import { useAppStore } from '@/store'
import { createOrUpdateAccount, deleteAccount } from '@/services/account'

import type { AccountProps, AccountWithTypeProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'

function AccountData() {
  const { actions, state: { accounts, accountTypes, sheet } } = useAppStore()
  const selected = sheet.selected as AccountWithTypeProps
  
  function getAccount() {
    if (selected.id) {
      return accounts.filter(item => item.id !== selected.id)
    }
    
    return accounts
  }
  
  async function handleActionDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteAccount(selected.id!)
      
      actions.setAccounts(getAccount())
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    if (formData && formAction === 'confirm') {
      const account = await createOrUpdateAccount({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        initial_balance: formData.initial_balance,
        account_type_id: formData.account_type_id,
      })
      
      const type = accountTypes.find(type => type.id === account.account_type_id)
      
      actions.setAccounts([...getAccount(), { ...account, type }])
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <>
      <ButtomNewItem sheetTitle="Conta" buttonTitle="Adicionar conta" />
      <AccountList handleAction={handleActionList} />
      
      {['earning', 'expense', 'transaction'].includes(sheet.action) ? (
        <TransactionSheetForm />
      ) : (
        <SheetForm>
          {['new', 'edit' as PageActions].includes(sheet.action) && (
            <AccountForm formData={selected} handleAction={handleActionForm} />
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
