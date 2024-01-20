import { Sheet } from '@/components/ui/sheet'
import { useAppStore } from '@/store'

import type { ReactNode } from 'react'

function SheetForm({ children }: { children: ReactNode }) {
  const { actions, state } = useAppStore()
  
  return (
    <Sheet open={state.sheet.toggle} onOpenChange={(open) => actions.setSheetToggle(open)}>
      {children}
    </Sheet>
  )
}

export default SheetForm