'use client'

import AccountForm from '@/components/layout/account/form'
import AccountList from '@/components/layout/account/list'
import ButtomNewItem from '@/components/layout/buttom-new-item'
import ConfirmDelete from '@/components/layout/confirm-delete'
import SheetForm from '@/components/layout/sheet-form'
import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import TransactinoSheetForm from '@/components/layout/transaction/sheet-form'

import { useAppStore } from '@/store'
import { GetFormActionTitles } from '@/consts/pages'
import { createOrUpdateAccount, deleteAccount } from '@/services/account'

import type { AccountProps, AccountWithTypeProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'

function AccountData() {
  const { actions, state } = useAppStore()
  const selected = state.sheet.selected as AccountWithTypeProps
  
  function shouldShowTransaction (action = state.sheet.action) {
    return ['earning', 'expense', 'transaction'].includes(action)
  }
  
  function getAccount() {
    if (selected.id) {
      return state.accounts.filter(item => item.id !== selected.id)
    }
    
    return state.accounts
  }
  
  function handleActionList(action: PageActions, selected: AccountWithTypeProps) {
    const page = {
      title: GetFormActionTitles({ page: 'conta' })[action],
      selected
    }
    
    if (shouldShowTransaction(action)) {
      page.title = GetFormActionTitles({ prefix: 'Nova' })[action]
      page.selected = {} as any
    }
    
    actions.setSheetOptions({
      action,
      title: page.title,
      selected: page.selected
    })
    
    actions.setSheetToggle(!state.sheet.toggle)
  }
  
  async function handleActionDelete(action: FormActions) {
    if (action === 'confirm') {
      
      await deleteAccount(selected.id!)
      actions.setAccounts(getAccount())
    }
    
    actions.setSheetToggle(!state.sheet.toggle)
  }
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    if (formData && formAction === 'confirm') {
      const account = await createOrUpdateAccount({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        initial_balance: formData.initial_balance,
        account_type_id: formData.account_type_id,
      })
      
      const type = state.accountTypes.find(type => type.id === account.account_type_id)
      
      actions.setAccounts([...getAccount(), { ...account, type }])
    }
    
    actions.setSheetToggle(!state.sheet.toggle)
  }
  
  return (
    <>
      <ButtomNewItem sheetTitle="Conta" buttonTitle="Adicionar conta" />
      <AccountList handleAction={handleActionList} />
      
      {shouldShowTransaction() ? (
        <TransactinoSheetForm />
      ) : (
        <SheetForm>
          <SheetContent className="sm:max-w-2xl">
            <SheetHeader>
              <h3 className="text-muted-foreground text-2xl leading-none tracking-tight font-medium">
                {state.sheet.title}
              </h3>
            </SheetHeader>
            
            {['new', 'edit'].includes(state.sheet.action) && (
              <AccountForm formData={selected} handleAction={handleActionForm} />
            )}
            
            {state.sheet.action === 'remove' && (
              <ConfirmDelete
                item={selected.name!}
                handleAction={handleActionDelete}
              />
            )}
          </SheetContent>
        </SheetForm>
      )}
    </>
  )
}

export default AccountData
