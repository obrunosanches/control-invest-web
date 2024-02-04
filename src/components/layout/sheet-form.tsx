'use client'

import { useSheetFormStore } from '@/store/useSheetFormStore'

import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'

import type { ReactNode } from 'react'

function SheetForm({ children, header = true }: { children: ReactNode, header?: boolean }) {
  const sheet = useSheetFormStore(state => state.sheet)
  const setSheetToggle = useSheetFormStore(state => state.actions.setSheetToggle)
  
  return (
    <Sheet open={sheet.toggle} onOpenChange={setSheetToggle}>
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