import { useAppStore } from '@/store'

import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import SheetForm from '@/components/layout/sheet-form'
import TrasactionForm from '@/components/layout/transaction/form'

import type { AccountProps, TransactionWithRelationsProps } from '@/types/schema'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { FormActions } from '@/types/pages'

function TransactinoSheetForm() {
  const { actions, state } = useAppStore()
  const selected = state.sheet.selected as TransactionWithRelationsProps
  
  async function handleActionForm(formAction: FormActions, formData?: AccountProps) {
    actions.setSheetToggle(!state.sheet.toggle)
  }
  
  return (
    <SheetForm>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <h3 className="text-muted-foreground text-2xl leading-none tracking-tight font-medium">
            {state.sheet.title}
          </h3>
        </SheetHeader>
        
        <Card className="mt-4">
          <CardContent className="p-6 grid gap-6" />
          <TrasactionForm formData={selected} handleAction={handleActionForm} />
        </Card>
      </SheetContent>
    </SheetForm>
  )
}

export default TransactinoSheetForm