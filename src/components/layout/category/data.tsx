'use client'

import { useAppStore } from '@/store'
import ButtomNewItem from '@/components/layout/buttom-new-item'
import CategoryList from '@/components/layout/category/list'

import type { CategoryWithRelationsProps } from '@/types/schema'
import type { PageActions } from '@/types/pages'

function CategoryData() {
  const { state: { sheet } } = useAppStore()
  const selected = sheet.selected as CategoryWithRelationsProps
  
  function handleActionList(action: PageActions, selected: CategoryWithRelationsProps) {}
  
  return (
    <>
      <CategoryList handleAction={handleActionList} />
    </>
  )
}

export default CategoryData