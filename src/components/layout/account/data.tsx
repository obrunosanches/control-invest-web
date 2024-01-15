'use client'

import { useReducer, useState } from 'react'
import { PlusCircle } from 'lucide-react'

import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import AccountForm from '@/components/layout/account/form'
import SheetForm from '@/components/layout/sheet-form'

import AccountList from '@/components/layout/account/list'
import { Button } from '@/components/ui/button'
import ConfirmDelete from '@/components/layout/confirm-delete'

import { GetActionTitles } from '@/consts/pages'

import type { AccountWithTypeProps } from '@/types/schema'
import type { PageActions } from '@/types/pages'

export type AccountAction = PageActions | 'earning' | 'expense' | 'transaction'

interface ReducerProps {
  action: AccountAction
  account: Partial<AccountWithTypeProps>
  title: string
}

interface AccountDataProps {
  accounts: AccountWithTypeProps[]
}

const reducer = (state: ReducerProps, update: Partial<ReducerProps>) => ({ ...state, ...update })

function AccountData({ accounts }: AccountDataProps) {
  const [toggle, setToggle] = useState(false)
  const [state, setState] = useReducer(reducer, {
    action: 'new',
    title: getTitle('new'),
    account: {}
  })
  
  function getTitle(action: PageActions) {
    return GetActionTitles('conta')[action] ?? GetActionTitles('conta')['new']
  }
  
  return (
    <>
      <div className="flex justify-end">
        <Button
          className="bg-purple-600 text-primary-foreground hover:bg-purple-500"
          onClick={() => {
            setState({
              action: 'new',
              title: GetActionTitles('conta')['new'],
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
        data={accounts}
        handleAction={(action, data) => {
          if (['earning', 'expense', 'transaction'].includes(action)) {
            return
          }
          
          setState({
            action,
            account: data,
            title: getTitle(action as PageActions)
          })
          setToggle(value => !value)
        }}
      />
      
      <SheetForm toggle={toggle} setToggle={setToggle}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <h3 className="text-muted-foreground text-2xl leading-none tracking-tight font-medium">
              {state.title}
            </h3>
          </SheetHeader>
          
          {state.action !== 'remove' && (
            <AccountForm
              data={state.account}
              handleAction={(formAction, data) => {
                setState({
                  account: data
                })
              
                setToggle(value => !value)
              }}
            />
          )}
          
          {state.action === 'remove' && (
            <ConfirmDelete
              item={state.account.name!}
              handleAction={(action) => {
                setToggle(value => !value)
              }}
            />
          )}
        </SheetContent>
      </SheetForm>
    </>
  )
}

export default AccountData
