'use client'

import { PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GetFormActionTitles } from '@/consts/pages'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store'

import type { ComponentProps } from 'react'

interface ButtomNewItemProps extends ComponentProps<'button'> {
  actionTitle: string
  title: string
}

function ButtomNewItem({ actionTitle, title, className }: ButtomNewItemProps) {
  const { actions, state } = useAppStore()
  
  return (
    <div className="flex justify-end">
      <Button
        className={cn("bg-purple-600 text-primary-foreground hover:bg-purple-500", className)}
        onClick={() => {
          actions.setSheetOptions({
            action: 'new',
            title: GetFormActionTitles(actionTitle)['new'],
            selected: {}
          })
          
          actions.setSheetToggle(!state.sheet.toggle)
        }}
      >
        <PlusCircle className="mr-2" size={16} strokeWidth={1.5} />
        {title}
      </Button>
    </div>
  )
}

export default ButtomNewItem