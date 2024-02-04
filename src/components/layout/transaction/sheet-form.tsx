'use client'

import { useAppStore } from '@/store'

import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import SheetForm from '@/components/layout/sheet-form'
import TrasactionForm from '@/components/layout/transaction/form'

import type { AccountProps, TransactionWithRelationsProps } from '@/types/schema'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { FormActions } from '@/types/pages'

function TransactinoSheetForm() {
  const { actions, state: { sheet } } = useAppStore()
  const selected = sheet.selected as TransactionWithRelationsProps
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <SheetForm>
      <Card className="mt-4">
        <CardContent className="p-6 grid gap-6" />
        <TrasactionForm formData={selected} handleAction={handleActionForm} />
      </Card>
    </SheetForm>
  )
}

export default TransactinoSheetForm