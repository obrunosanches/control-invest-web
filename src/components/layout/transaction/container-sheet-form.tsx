'use client'

import SheetForm from '@/components/layout/sheet-form'
import TransactionForm from '@/components/layout/transaction/form'

import type { AccountProps, TransactionWithRelationsProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'

import { useSheetStore } from '@/store/sheet-store'

function ContainerSheetForm() {
  const actions = useSheetStore((store) => store.actions)
  const sheet = useSheetStore((store) => store.sheet)
  const selected = sheet.selected as TransactionWithRelationsProps
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <SheetForm>
      <TransactionForm formData={selected} handleAction={handleActionForm} />
    </SheetForm>
  )
}

export default ContainerSheetForm