'use client'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'

import type { ReactNode } from 'react'

function SheetForm({ children, header = true }: { children: ReactNode, header?: boolean }) {
  const store = useCIStore((store) => store)
  const sheet = store.sheet
  
  return (
    <Sheet open={sheet.toggle} onOpenChange={store.actions.setSheetToggle}>
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