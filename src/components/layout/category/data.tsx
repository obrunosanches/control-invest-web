'use client'

import { useCallback, useEffect, useState } from 'react'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import CategoryForm from '@/components/layout/category/form'
import ConfirmDelete from '@/components/layout/confirm-delete'
import SubCategoryForm from '@/components/layout/sub-category/form'
import CategoryList from '@/components/layout/category/list'
import ButtonNewItem from '@/components/layout/button-new-item'
import SheetForm from '@/components/layout/sheet-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { request } from '@/server/request'
import { createOrUpdateCategory, deleteCategory } from '@/services/category'

import type { CategoryProps, CategoryWithRelationsProps, SubCategoryProps, TransactionTypeProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'
import type { TransactionSlug } from '@/types/database'
import { createOrUpdateSubCategory, deleteSubCategory } from '@/services/sub-category'

interface CategoryDataProps {
  categoriesData: CategoryWithRelationsProps[]
  transactionTypesData: TransactionTypeProps[]
}

function CategoryData({ categoriesData, transactionTypesData }: CategoryDataProps) {
  const store = useCIStore((store) => store)
  const sheet = store.sheet
  const transactionTypesDefault = store.getters.getDefaultTransactionTypes()
  
  const [transactionTypeSelected, setSelectedTransactionType] = useState<TransactionTypeProps>(
    transactionTypesDefault[0]
  )
  
  const storeData = useCallback(({ categories, types }: { categories: CategoryWithRelationsProps[], types: TransactionTypeProps[] }) => {
    store.actions.setCategories(categories)
    store.actions.setTransactionTypes(types)
    
    setSelectedTransactionType(types[0])
  }, [store.actions])
  
  const fetchCategories = useCallback(async (typeId: number) => {
    const categoriesResponse = await request(`/category/type/${typeId}`, { cache: 'no-store' })
    const categories = await categoriesResponse.json()
    
    store.actions.setCategories(categories)
  }, [store.actions])
  
  const handleSelectTransactionType = useCallback(async (slug: TransactionSlug) => {
    const transactionType = transactionTypesDefault.find(type => type.slug === slug)
    
    if (transactionType?.id) {
      await fetchCategories(transactionType.id)
      setSelectedTransactionType(transactionType)
    }
  }, [transactionTypesDefault, fetchCategories])
  
  useEffect(() => {
    storeData({ categories: categoriesData, types: transactionTypesData })
  }, [categoriesData, transactionTypesData, storeData])
  
  async function handleActionCategoryForm(formAction: FormActions, formData?: CategoryProps) {
    if (formData && formAction === 'confirm') {
      const selected = store.sheet.selected as CategoryWithRelationsProps
      
      await createOrUpdateCategory({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        type_id: formData.type_id
      })
      
      if (transactionTypeSelected?.id) {
        await fetchCategories(transactionTypeSelected.id)
      }
    }
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionSubCategoryForm(formAction: FormActions, formData?: SubCategoryProps) {
    const selected = store.sheet.selected as SubCategoryProps
    
    if (formData && formAction === 'confirm') {
      await createOrUpdateSubCategory({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        category_id: formData.category_id
      })
      
      if (transactionTypeSelected?.id) {
        await fetchCategories(transactionTypeSelected.id)
      }
    }
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionCategoryDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteCategory(sheet.selected.id)
      await fetchCategories(sheet.selected.type_id)
    }
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionSubCategoryDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteSubCategory(sheet.selected.id)
    }
    
    if (transactionTypeSelected?.id) {
      await fetchCategories(transactionTypeSelected.id)
    }
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <>
      <div className="flex justify-between mt-6">
        <Select
          onValueChange={handleSelectTransactionType}
          value={transactionTypeSelected?.slug}
          aria-label="Categories type"
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypesDefault.map((type) => (
              <SelectItem key={type.id} value={type.slug}>
                {type.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <ButtonNewItem sheetTitle="Categoria" pageSource="category" buttonTitle="Adicionar categoria" />
      </div>
      
      <CategoryList />
      
      <SheetForm>
        {['new', 'edit' as PageActions].includes(sheet.action) && sheet.pageSource && (
          <>
            {sheet.pageSource === 'category' && (
              <CategoryForm
                transactionTypeSelected={transactionTypeSelected}
                handleAction={handleActionCategoryForm}
              />
            )}
            
            {sheet.pageSource === 'sub-category' && (
              <SubCategoryForm handleAction={handleActionSubCategoryForm} />
            )}
          </>
        )}
        
        {sheet.action === 'remove' && sheet.pageSource === 'category' && (
          <ConfirmDelete
            item={sheet.selected.name!}
            handleAction={handleActionCategoryDelete}
          />
        )}

        {sheet.action === 'remove' && sheet.pageSource === 'sub-category' && (
          <ConfirmDelete
            item={sheet.selected.name!}
            handleAction={handleActionSubCategoryDelete}
          />
        )}
      </SheetForm>
    </>
  )
}

export default CategoryData