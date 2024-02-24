'use client'

import AccountList from '@/components/layout/account/list'
import ButtonNewItem from '@/components/layout/button-new-item'

import { fetchAccounts } from '@/services/account'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { useCallback, useEffect } from 'react'
import ContainerSheetForm from '@/components/layout/account/container-sheet-form'

function AccountData() {
  const actions = useCIStore((store) => store.actions)
  
  const refreshAccounts = useCallback(() => {
    new Promise(async (resolve) => {
      const accounts = await fetchAccounts()
      
      actions.setAccounts(accounts)
      resolve(accounts)
    }).catch(e => console.log(e))
  },[actions])
  
  return (
    <>
      <ButtonNewItem sheetTitle="Conta" pageSource="account" buttonTitle="Adicionar conta" />
      <AccountList />
      <ContainerSheetForm onConfirm={refreshAccounts} />
    </>
  )
}

export default AccountData
