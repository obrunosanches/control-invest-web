'use client'

import SheetForm from '@/components/layout/sheet-form'
import TransactionForm, { FormDataTransaction } from '@/components/layout/transaction/form'

import type { TransactionProps, TransactionWithRelationsProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'

import { useSheetStore } from '@/store/sheet-store'
import type { TransactionOptions } from '@/types/database'
import { createOrUpdateTransaction, fetchTransactions } from '@/services/transaction'
import { useCIStore } from '@/hooks/control-invest-store-provider'
import { fetchAccounts } from '@/services/account'

interface ContainerSheetFormProps {
  slug: TransactionOptions
}

function ContainerSheetForm({ slug }: ContainerSheetFormProps) {
  const { actions: { setTransactions, setAccounts }, getters, transactionFilters } = useCIStore((store) => store)
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
      
      setTransactions(await fetchTransactions(transactionFilters))
      setAccounts(await fetchAccounts())
    }
  }
  
  return (
    <SheetForm>
      <TransactionForm
        slug={slug}
        formData={selected}
        handleAction={handleActionForm}
      />
    </SheetForm>
  )
}

export default ContainerSheetForm