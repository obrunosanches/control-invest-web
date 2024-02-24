'use client'


import SheetForm from '@/components/layout/sheet-form'
import TransactionForm from '@/components/layout/transaction/form'

import type { AccountProps, TransactionWithRelationsProps } from '@/types/schema'
import { Card, CardContent } from '@/components/ui/card'
import type { FormActions } from '@/types/pages'
import { useCIStore } from '@/hooks/control-invest-store-provider'
import { useSheetStore } from '@/store/sheet-store'

function TransactionSheetForm() {
  const actions = useSheetStore((store) => store.actions)
  const sheet = useSheetStore((store) => store.sheet)
  const selected = sheet.selected as TransactionWithRelationsProps
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <SheetForm>
      <Card className="mt-4">
        <CardContent className="p-6 grid gap-6" />
        <TransactionForm formData={selected} handleAction={handleActionForm} />
      </Card>
    </SheetForm>
  )
}

export default TransactionSheetForm