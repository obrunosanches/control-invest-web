'use client'

import { PlusCircle } from 'lucide-react'

import type { ComponentProps } from 'react'
import type { PagesSources } from '@/types/pages'

import { cn } from '@/lib/utils'
import { GenerateSheetTitleForm } from '@/consts/pages'
import { useSheetStore } from '@/store/sheet-store'

import { Button } from '@/components/ui/button'

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
  const sheet = useSheetStore(state => state.sheet)
  const actions = useSheetStore(state => state.actions)
  
  return (
    <div className="flex justify-end">
      <Button
        className={cn("bg-purple-600 text-primary-foreground hover:bg-purple-500", className)}
        onClick={() => {
          actions.setSheetOptions({
            action: 'new',
            selected: {},
            title: GenerateSheetTitleForm({ title: sheetTitle })['new'],
            pageSource
          })

          actions.setSheetToggle(!sheet.toggle)
        }}
      >
        <PlusCircle className="mr-2" size={16} strokeWidth={1.5} />
        {buttonTitle}
      </Button>
    </div>
  )
}

export default ButtonNewItem