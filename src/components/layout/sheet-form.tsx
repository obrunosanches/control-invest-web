'use client'

import { Sheet } from '@/components/ui/sheet'
import { useAppStore } from '@/store'

import type { ReactNode } from 'react'

function SheetForm({ children }: { children: ReactNode }) {
  const { actions, state: { sheet } } = useAppStore()
  
  return (
    <Sheet open={sheet.toggle} onOpenChange={(open) => actions.setSheetToggle(open)}>
      {children}
    </Sheet>
  )
}

export default SheetForm