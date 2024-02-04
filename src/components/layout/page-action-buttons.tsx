'use client'

import { BadgeDollarSignIcon, PenSquare, PlusCircleIcon, Trash2Icon } from 'lucide-react'

import { useAppStore } from '@/store'
import { FormActionTitles, GetFormActionTitles } from '@/consts/pages'
import { Button } from '@/components/ui/button'

import { ComponentProps, useMemo } from 'react'
import type { PageActions } from '@/types/pages'

interface PageActionsButtonsProps extends ComponentProps<'div'> {
  actionTitle: string
  actionTitleNew?: string
  actionTitleEdit?: string
  actionTitleRemove?: string
  classNameButtons?: HTMLElement['className']
  showButtons?: PageActions[]
  selected: any
}

function PageActionButtons({
  actionTitle,
  actionTitleNew = actionTitle,
  actionTitleEdit = actionTitle,
  actionTitleRemove = actionTitle,
  classNameButtons,
  showButtons = ['new', 'edit', 'remove'],
  selected
}: PageActionsButtonsProps) {
  const { actions, state: { sheet } } = useAppStore()
  
  const formActionTitles = useMemo(() => ({
    earning: { page: actionTitle, prefix: 'Nova' },
    edit: { page: actionTitleEdit },
    expense: { page: actionTitleRemove, prefix: 'Nova' },
    new: { page: actionTitleNew },
    remove: { page: actionTitleRemove },
    transaction: { page: actionTitleRemove, prefix: 'Nova' }
  } as Record<PageActions, FormActionTitles>), [actionTitle, actionTitleEdit, actionTitleNew, actionTitleRemove])
  
  function handleAction(action: PageActions) {
    actions.setSheetOptions({
      action,
      title: GetFormActionTitles({ ...formActionTitles[action] })[action],
      selected: selected
    })
    
    actions.setSheetToggle(!sheet.toggle)
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