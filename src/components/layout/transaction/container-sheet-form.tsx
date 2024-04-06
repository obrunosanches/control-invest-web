'use client'

import type { TransactionProps, TransactionWithRelationsProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'
import type { TransactionOptions } from '@/types/database'

import { useSheetStore } from '@/store/sheet-store'
import { createOrUpdateTransaction, deleteTransaction } from '@/services/transaction'
import { useCIStore } from '@/hooks/control-invest-store-provider'

import SheetForm from '@/components/layout/sheet-form'
import TransactionForm, { FormDataTransaction } from '@/components/layout/transaction/form'
import ConfirmDelete from '@/components/layout/confirm-delete'

interface ContainerSheetFormProps {
  slug: TransactionOptions
  onConfirm: () => void
}

function ContainerSheetForm({ slug, onConfirm }: ContainerSheetFormProps) {
  const { getters, transactionFilters } = useCIStore((store) => store)
  const actions = useSheetStore((store) => store.actions)
  const sheet = useSheetStore((store) => store.sheet)
  const selected = sheet.selected as TransactionWithRelationsProps
  
  async function handleActionForm(formAction: FormActions, formData?: FormDataTransaction) {
    actions.setSheetToggle(!sheet.toggle)
    
    if (formData) {
      const transactionType = getters.getTransactionTypeBySlug(slug)
      
      const transactionData: TransactionProps = {
        type_id: transactionType?.id!,
        sub_category_id: Number(formData.subCategoryId),
        category_id: Number(formData.categoryId),
        note: formData.note,
        date: formData.date,
        description: formData.description,
        account_id: Number(formData.accountId),
        value: formData.value
      }
      
      await createOrUpdateTransaction(transactionData)
      
      onConfirm()
    }
  }
  
  async function handleTransactionTransactionDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteTransaction(sheet.selected.id)
      
      onConfirm()
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <SheetForm>
      {['new', 'edit' as PageActions].includes(sheet.action) && (
        <TransactionForm
          slug={slug}
          formData={selected}
          handleAction={handleActionForm}
        />
      )}
      
      {sheet.action === 'remove' && (
        <ConfirmDelete
          item={sheet.selected.description!}
          handleAction={handleTransactionTransactionDelete}
        />
      )}
    </SheetForm>
  )
}

export default ContainerSheetForm