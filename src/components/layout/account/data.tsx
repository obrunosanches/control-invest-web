'use client'

import { useReducer, useState } from 'react'
import { PlusCircle } from 'lucide-react'

import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import AccountForm from '@/components/layout/account/form'
import SheetForm from '@/components/layout/sheet-form'

import AccountList from '@/components/layout/account/list'
import { Button } from '@/components/ui/button'
import ConfirmDelete from '@/components/layout/confirm-delete'

import { GetFormActionTitles } from '@/consts/pages'

import type { AccountProps, AccountTypeProps, AccountWithTypeProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'
import { createOrUpdateAccount, deleteAccount } from '@/services/account'

export type AccountAction = PageActions | 'earning' | 'expense' | 'transaction'

interface ReducerProps {
  action: AccountAction
  account: Partial<AccountWithTypeProps>
  isAddOrEdit: boolean
  title: string
}

interface AccountDataProps {
  accounts: AccountWithTypeProps[]
  accountTypes: AccountTypeProps[]
}

const reducer = (state: ReducerProps, update: Partial<ReducerProps>) => ({ ...state, ...update })

function AccountData({ accounts, accountTypes }: AccountDataProps) {
  const [toggle, setToggle] = useState(false)
  const [state, setState] = useReducer(reducer, {
    action: 'new',
    isAddOrEdit: true,
    title: getTitle('new'),
    account: {}
  })
  
  function getTitle(action: PageActions) {
    return GetFormActionTitles('conta')[action] ?? GetFormActionTitles('conta')['new']
  }
  
  function handleActionList(action: AccountAction, selected: AccountWithTypeProps) {
    if (['earning', 'expense', 'transaction'].includes(action)) {
      return
    }
    
    setState({
      action,
      account: selected,
      isAddOrEdit: action !== 'remove',
      title: getTitle(action as PageActions)
    })
    setToggle(value => !value)
  }
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    if (formData && formAction === 'confirm') {
      await createOrUpdateAccount({
        ...(state.account.id && { id: state.account.id }),
        name: formData.name,
        initial_balance: formData.initial_balance,
        account_type_id: formData.account_type_id,
      })
    }
    
    setToggle(value => !value)
  }
  
  return (
    <>
      <div className="flex justify-end">
        <Button
          className="bg-purple-600 text-primary-foreground hover:bg-purple-500"
          onClick={() => {
            setState({
              action: 'new',
              title: GetFormActionTitles('conta')['new'],
              account: {}
            })
            setToggle(value => !value)
          }}
        >
          <PlusCircle className="mr-2" size={16} strokeWidth={1.5} />
          Adicionar conta
        </Button>
      </div>
      
      <AccountList
        accountData={accounts}
        handleAction={handleActionList}
      />
      
      <SheetForm toggle={toggle} setToggle={setToggle}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <h3 className="text-muted-foreground text-2xl leading-none tracking-tight font-medium">
              {state.title}
            </h3>
          </SheetHeader>
          
          {state.isAddOrEdit && (
            <AccountForm
              formData={state.account}
              accountTypes={accountTypes}
              handleAction={handleActionForm}
            />
          )}
          
          {state.action === 'remove' && (
            <ConfirmDelete
              item={state.account.name!}
              handleAction={async (action) => {
                if (action === 'confirm') {
                  await deleteAccount(state.account.id!)
                  setToggle(value => !value)
                }
              }}
            />
          )}
        </SheetContent>
      </SheetForm>
    </>
  )
}

export default AccountData
