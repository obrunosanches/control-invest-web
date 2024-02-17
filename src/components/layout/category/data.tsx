'use client'

import { useCallback, useEffect, useState } from 'react'

import { useCIStore } from '@/hooks/control-invest-store-provider'

import CategoryForm from '@/components/layout/category/form'
import ConfirmDelete from '@/components/layout/confirm-delete'
import SubCategoryForm from '@/components/layout/sub-category/form'
import CategoryList from '@/components/layout/category/list'
import ButtonNewItem from '@/components/layout/button-new-item'
import SheetForm from '@/components/layout/sheet-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { request } from '@/server/request'

import type {
  CategoryProps,
  CategoryWithRelationsProps,
  SubCategoryProps,
  TransactionTypeProps
} from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'

interface CategoryDataProps {
  categoriesData: CategoryWithRelationsProps[]
  transactionTypesData: TransactionTypeProps[]
}

function CategoryData({ categoriesData, transactionTypesData }: CategoryDataProps) {
  const store = useCIStore((store) => store)
  const sheet = store.sheet
  const transactionTypesDefault = store.getters.getDefaultTransactionTypes()
  
  const storeData = useCallback(({ categories, types }: { categories: CategoryWithRelationsProps[], types: TransactionTypeProps[] }) => {
    store.actions.setCategories(categories)
    store.actions.setTransactionTypes(types)
  }, [store.actions])
  
  useEffect(() => storeData({ categories: categoriesData, types: transactionTypesData }), [categoriesData, transactionTypesData, storeData])
  
  const [transactionTypeSelected, setSelectedTransactionType] = useState<TransactionTypeProps>(
    transactionTypesDefault[0]
  )
  
  const handleSelectTransactionType = useCallback(async (value: string) => {
    const [transactionType] = transactionTypesDefault.filter(type => type.slug === value)
    const categoriesResponse = await request(`/category/type/${transactionType.id}`, { cache: 'no-store' })
    const categories = await categoriesResponse.json()
    
    setSelectedTransactionType(transactionType)
    store.actions.setCategories(categories)
  }, [store.actions, transactionTypesDefault])
  
  async function handleActionForm(formAction: FormActions, formData?: CategoryProps) {
    console.log('handleActionForm:formData', formData)
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionSubCategoryForm(formAction: FormActions, formData?: SubCategoryProps) {
    console.log('handleActionSubCategoryForm:formData', formData)
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionDelete(action: FormActions) {
    if (action === 'confirm') {
      // await deleteAccount(sheet.selected.id)
      
      // store.actions.setAccounts(getAccount())
    }
    
    store.actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <>
      <div className="flex justify-between mt-6">
        <Select
          onValueChange={handleSelectTransactionType}
          defaultValue={transactionTypeSelected?.slug}
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
                handleAction={handleActionForm}
              />
            )}
            
            {sheet.pageSource === 'sub-category' && (
              <SubCategoryForm handleAction={handleActionSubCategoryForm} />
            )}
          </>
        )}
        
        {sheet.action === 'remove' && (
          <ConfirmDelete
            item={sheet.selected.name!}
            handleAction={handleActionDelete}
          />
        )}
      </SheetForm>
    </>
  )
}

export default CategoryData