'use client'

import { PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GetFormActionTitles } from '@/consts/pages'
import { cn } from '@/lib/utils'
import { useSheetFormStore } from '@/store/useSheetFormStore'

import type { ComponentProps } from 'react'

interface ButtonNewItemProps extends ComponentProps<'button'> {
  buttonTitle: string
  sheetTitle: string
}

function ButtonNewItem({
  buttonTitle,
  className,
  sheetTitle,
}: ButtonNewItemProps) {
  const sheet = useSheetFormStore(state => state.sheet)
  const setSheetToggle = useSheetFormStore(state => state.actions.setSheetToggle)
  const setSheetOptions = useSheetFormStore(state => state.actions.setSheetOptions)
  
  return (
    <div className="flex justify-end">
      <Button
        className={cn("bg-purple-600 text-primary-foreground hover:bg-purple-500", className)}
        onClick={() => {
          setSheetOptions({
            action: 'new',
            selected: {},
            title: GetFormActionTitles({ page: sheetTitle })['new']
          })

          setSheetToggle(!sheet.toggle)
        }}
      >
        <PlusCircle className="mr-2" size={16} strokeWidth={1.5} />
        {buttonTitle}
      </Button>
    </div>
  )
}

export default ButtonNewItem