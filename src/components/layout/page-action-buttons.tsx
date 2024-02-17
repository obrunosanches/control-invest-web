'use client'

import { useMemo } from 'react'
import { BadgeDollarSignIcon, PenSquare, PlusCircleIcon, Trash2Icon } from 'lucide-react'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { GenerateSheetTitleForm } from '@/consts/pages'
import { Button } from '@/components/ui/button'

import type { ComponentProps } from 'react'
import type { PageActions } from '@/types/pages'
import type { SheetTitleForm } from '@/consts/pages'

interface PageActionsButtonsProps extends ComponentProps<'div'> {
  classNameButtons?: HTMLElement['className']
  selected: any
  sheetTitle: string
  sheetTitleEdit?: string
  sheetTitleNew?: string
  sheetTitleRemove?: string
  showButtons?: PageActions[]
}

function PageActionButtons({
  classNameButtons,
  selected,
  sheetTitle,
  sheetTitleEdit = sheetTitle,
  sheetTitleNew = sheetTitle,
  sheetTitleRemove = sheetTitle,
  showButtons = ['new', 'edit', 'remove'],
}: PageActionsButtonsProps) {
  const store = useCIStore((store) => store)
  const sheet = store.sheet
  
  const sheetTitles = useMemo(() => ({
    earning: { title: sheetTitle, prefix: 'Nova' },
    edit: { title: sheetTitleEdit },
    expense: { title: sheetTitleRemove, prefix: 'Nova' },
    new: { title: sheetTitleNew },
    remove: { title: sheetTitleRemove },
    transaction: { title: sheetTitleRemove, prefix: 'Nova' }
  } as Record<PageActions, SheetTitleForm>), [sheetTitle, sheetTitleEdit, sheetTitleNew, sheetTitleRemove])
  
  function handleAction(action: PageActions) {
    const sheetTitleFormData = sheetTitles[action]
    
    store.actions.setSheetOptions({
      action,
      title: GenerateSheetTitleForm(sheetTitleFormData)[action],
      selected: selected
    })
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <>
      {showButtons?.includes('new') && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAction('new')}
          className={classNameButtons}
        >
          <PlusCircleIcon strokeWidth={1.5} size={20} color="#22C55E" />
          <span className="sr-only">Show subcategories</span>
        </Button>
      )}
      
      {showButtons?.includes('edit') && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAction('edit')}
          className={classNameButtons}
        >
          <PenSquare strokeWidth={1.5} size={20} color="#3B82F6" />
          <span className="sr-only">Edit category</span>
        </Button>
      )}
      
      {showButtons?.includes('remove') && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAction('remove')}
          className={classNameButtons}
        >
          <Trash2Icon strokeWidth={1.5} size={20} color="#DC2626" />
          <span className="sr-only">Remove category</span>
        </Button>
      )}
      
      {showButtons?.includes('earning') && (
        <Button
          variant="ghost"
          onClick={() => handleAction('earning')}
          className={classNameButtons}
        >
          <PlusCircleIcon strokeWidth={1} color="#22C55E" className="mr-2" />
          <span className="font-light">Receitas</span>
          <span className="sr-only">add earning</span>
        </Button>
      )}
      
      {showButtons?.includes('expense') && (
        <Button
          variant="ghost"
          onClick={() => handleAction('expense')}
          className={classNameButtons}
        >
          <PlusCircleIcon strokeWidth={1} color="#DC2626" className="mr-2" />
          <span className="font-light">Despesas</span>
          <span className="sr-only">add expense</span>
        </Button>
      )}
      
      {showButtons?.includes('transaction') && (
        <Button
          variant="ghost"
          onClick={() => handleAction('transaction')}
          className={classNameButtons}
        >
          <BadgeDollarSignIcon strokeWidth={1} color="#64748B" className="mr-2" />
          <span className="font-light">Transações</span>
        </Button>
      )}
    </>
  )
}

export default PageActionButtons