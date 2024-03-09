'use client'

import SheetForm from '@/components/layout/sheet-form'
import TransactionForm, { FormDataTransaction } from '@/components/layout/transaction/form'

import type { TransactionWithRelationsProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'

import { useSheetStore } from '@/store/sheet-store'
import type { TransactionOptions } from '@/types/database'

interface ContainerSheetFormProps {
  slug: TransactionOptions
}

function ContainerSheetForm({ slug }: ContainerSheetFormProps) {
  const actions = useSheetStore((store) => store.actions)
  const sheet = useSheetStore((store) => store.sheet)
  const selected = sheet.selected as TransactionWithRelationsProps
  
  async function handleActionForm(formAction: FormActions, formData?: FormDataTransaction) {
    actions.setSheetToggle(!sheet.toggle)
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