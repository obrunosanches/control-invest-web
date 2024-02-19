'use client'

import { useCallback, useMemo } from 'react'
import { BadgeDollarSignIcon, PenSquare, PlusCircleIcon, Trash2Icon } from 'lucide-react'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { GenerateSheetTitleForm } from '@/consts/pages'
import { Button } from '@/components/ui/button'

import type { ComponentProps } from 'react'
import type { PageActions, PagesSources } from '@/types/pages'
import type { SheetTitleForm } from '@/consts/pages'

interface PageActionsButtonsProps extends ComponentProps<'div'> {
  classNameButtons?: HTMLElement['className']
  pageSource: PagesSources
  pageSourceNew?: PagesSources
  selected: any
  selectedNew?: any
  sheetTitle: string
  sheetTitleNew?: string
  showButtons?: PageActions[]
}

function PageActionButtons({
  classNameButtons,
  pageSource,
  pageSourceNew = pageSource,
  selected,
  selectedNew = selected,
  sheetTitle,
  sheetTitleNew = sheetTitle,
  showButtons = ['new', 'edit', 'remove']
}: PageActionsButtonsProps) {
  const store = useCIStore((store) => store)
  const sheet = store.sheet
  
  const sheetTitles = useMemo(() => ({
    earning: { title: sheetTitle, prefix: 'Nova' },
    edit: { title: sheetTitle },
    expense: { title: sheetTitle, prefix: 'Nova' },
    new: { title: sheetTitleNew },
    remove: { title: sheetTitle },
    transaction: { title: sheetTitle, prefix: 'Nova' }
  } as Record<PageActions, SheetTitleForm>), [sheetTitle, sheetTitleNew])
  
  const pageSources = useMemo(() => ({
    earning: pageSource,
    edit: pageSource,
    expense: pageSource,
    new: pageSourceNew,
    remove: pageSource,
    transaction: pageSource
  } as Record<PageActions, PagesSources>), [pageSource, pageSourceNew])

  const currentSelected = useMemo(() => ({
    earning: selected,
    edit: selected,
    expense: selected,
    new: selectedNew,
    remove: selected,
    transaction: selected
  } as Record<PageActions, any>), [selected, selectedNew])
  
  const handleAction = useCallback((action: PageActions) => {
    const sheetTitleFormData = sheetTitles[action]
    
    store.actions.setSheetOptions({
      action,
      title: GenerateSheetTitleForm(sheetTitleFormData)[action],
      selected: currentSelected[action],
      pageSource: pageSources[action]
    })
    
    store.actions.setSheetToggle(!sheet.toggle)
  }, [currentSelected, pageSources, sheet.toggle, sheetTitles, store.actions])
  
  const handleActionNew = useCallback(() => handleAction('new'), [handleAction])
  
  const handleActionEdit = useCallback(() => handleAction('edit'), [handleAction])
  
  const handleActionRemove = useCallback(() => handleAction('remove'), [handleAction])
  
  const handleActionEarning = useCallback(() => handleAction('earning'), [handleAction])
  
  const handleActionExpense = useCallback(() => handleAction('expense'), [handleAction])
  
  const handleActionTransaction = useCallback(() => handleAction('transaction'), [handleAction])
  
  return (
    <>
      {showButtons?.includes('new') && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleActionNew}
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
          onClick={handleActionEdit}
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
          onClick={handleActionRemove}
          className={classNameButtons}
        >
          <Trash2Icon strokeWidth={1.5} size={20} color="#DC2626" />
          <span className="sr-only">Remove category</span>
        </Button>
      )}
      
      {showButtons?.includes('earning') && (
        <Button
          variant="ghost"
          onClick={handleActionEarning}
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
          onClick={handleActionExpense}
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
          onClick={handleActionTransaction}
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