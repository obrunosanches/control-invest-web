import { Sheet } from '@/components/ui/sheet'
import type { ReactNode } from 'react'
import { useAppStore } from '@/store'

function SheetForm({ children }: { children: ReactNode }) {
  const { actions, state } = useAppStore()
  
  return (
    <Sheet open={state.sheet.toggle} onOpenChange={(open) => actions.setSheetToggle(open)}>
      {children}
    </Sheet>
  )
}

export default SheetForm