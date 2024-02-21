'use client'

import { PlusCircle } from 'lucide-react'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import { Button } from '@/components/ui/button'
import { GenerateSheetTitleForm } from '@/consts/pages'
import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'
import type { PagesSources } from '@/types/pages'

interface ButtonNewItemProps extends ComponentProps<'button'> {
  buttonTitle: string
  sheetTitle: string
  pageSource: PagesSources
}

function ButtonNewItem({
  buttonTitle,
  className,
  sheetTitle,
  pageSource
}: ButtonNewItemProps) {
  const store = useCIStore((store) => store)
  const sheet = store.sheet
  
  return (
    <div className="flex justify-end">
      <Button
        className={cn("bg-purple-600 text-primary-foreground hover:bg-purple-500", className)}
        onClick={() => {
          store.actions.setSheetOptions({
            action: 'new',
            selected: {},
            title: GenerateSheetTitleForm({ title: sheetTitle })['new'],
            pageSource
          })

          store.actions.setSheetToggle(!sheet.toggle)
        }}
      >
        <PlusCircle className="mr-2" size={16} strokeWidth={1.5} />
        {buttonTitle}
      </Button>
    </div>
  )
}

export default ButtonNewItem