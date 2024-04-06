import type { AccountProps, AccountWithTypeProps, TransactionTypeProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'

import { useSheetStore } from '@/store/sheet-store'
import { createOrUpdateAccount, deleteAccount } from '@/services/account'

import TransactionContainerSheetForm from '@/components/layout/transaction/container-sheet-form'
import SheetForm from '@/components/layout/sheet-form'
import AccountForm from '@/components/layout/account/form'
import ConfirmDelete from '@/components/layout/confirm-delete'
import { TransactionOptions } from '@/types/database'

function ContainerSheetForm({ onConfirm }: { onConfirm: () => void }) {
  const sheet = useSheetStore(state => state.sheet)
  const selected = useSheetStore(state => state.sheet.selected) as AccountWithTypeProps
  const actions = useSheetStore(state => state.actions)
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    if (formData && formAction === 'confirm') {
      await createOrUpdateAccount({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        initial_balance: formData.initial_balance,
        account_type_id: formData.account_type_id,
      })
      
      onConfirm()
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteAccount(selected.id!)
      
      onConfirm()
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <>
      {['earning', 'expense', 'transaction'].includes(sheet.action) ? (
        <TransactionContainerSheetForm slug={sheet.action as TransactionOptions} />
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

export default ContainerSheetForm