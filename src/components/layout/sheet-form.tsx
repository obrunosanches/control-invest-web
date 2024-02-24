'use client'

import type { ReactNode } from 'react'

import { useSheetStore } from '@/store/sheet-store'

import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'

function SheetForm({ children, header = true }: { children: ReactNode, header?: boolean }) {
  const sheet = useSheetStore(state => state.sheet)
  const actions = useSheetStore(state => state.actions)
  
  return (
    <Sheet open={sheet.toggle} onOpenChange={actions.setSheetToggle}>
      <SheetContent className="sm:max-w-2xl">
        {header && (
          <SheetHeader>
            <h3 className="text-muted-foreground text-2xl leading-none tracking-tight font-medium">
              {sheet.title}
            </h3>
          </SheetHeader>
        )}
        
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default SheetForm