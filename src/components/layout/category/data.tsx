'use client'

import { useAppStore } from '@/store'

import CategoryList from '@/components/layout/category/list'
import ButtomNewItem from '@/components/layout/buttom-new-item'
import SheetForm from '@/components/layout/sheet-form'

function CategoryData() {
  const { state: { sheet } } = useAppStore()
  
  return (
    <>
      <ButtomNewItem sheetTitle="Categoria" buttonTitle="Adicionar categoria" />
      
      <CategoryList />
      
      <SheetForm>
        {sheet.selected.name}
      </SheetForm>
    </>
  )
}

export default CategoryData