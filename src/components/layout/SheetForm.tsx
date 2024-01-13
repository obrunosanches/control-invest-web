import { Sheet } from '@/components/ui/sheet'
import { Dispatch, ReactNode, SetStateAction } from 'react'

function SheetForm({ children, toggle, setToggle }: { children: ReactNode, toggle: boolean; setToggle: Dispatch<SetStateAction<boolean>>  }) {
  return (
    <Sheet open={toggle} onOpenChange={setToggle}>
      {children}
    </Sheet>
  )
}

export default SheetForm