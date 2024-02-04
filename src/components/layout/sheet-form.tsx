'use client'

import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { useAppStore } from '@/store'

import type { ReactNode } from 'react'

function SheetForm({ children, header = true }: { children: ReactNode, header?: boolean }) {
  const { actions, state: { sheet } } = useAppStore()
  
  return (
    <Sheet open={sheet.toggle} onOpenChange={(open) => actions.setSheetToggle(open)}>
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