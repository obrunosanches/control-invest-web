'use client'

import { useAppStore } from '@/store'

import CategoryList from '@/components/layout/category/list'
import ButtomNewItem from '@/components/layout/buttom-new-item'
import SheetForm from '@/components/layout/sheet-form'
import { PageActions } from '@/types/pages'
import { CategoryWithRelationsProps } from '@/types/schema'

function CategoryData() {
  const { state: { categories,  sheet } } = useAppStore()
  
  function handleActionList(action: PageActions, selected: CategoryWithRelationsProps) {}
  
  return (
    <>
      <ButtomNewItem sheetTitle="Categoria" buttonTitle="Adicionar categoria" />
      
      <CategoryList handleAction={handleActionList} />
      
      <SheetForm>
        {sheet.selected.name}
      </SheetForm>
    </>
  )
}

export default CategoryData