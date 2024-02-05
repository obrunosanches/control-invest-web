'use client'

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
import { useCallback, useState } from 'react'

import { useTransactionTypeStore } from '@/store/useTransactionTypeStore'
import { useSheetFormStore } from '@/store/useSheetFormStore'
import { useCategoryStore } from '@/store/useCategoryStore'

import { request } from '@/server/request'

import type { TransactionTypeProps } from '@/types/schema'

function CategoryData() {
  const setCategories = useCategoryStore(state => state.actions.setCategories)
  const sheet = useSheetFormStore(state => state.sheet)
  const { getters: { getDefaultTransactionTypes } } = useTransactionTypeStore()
  
  const [transactionTypeSelected, setSelectedTransactionType] = useState<TransactionTypeProps>(
    getDefaultTransactionTypes()[0]
  )
  
  const handleSelectTransactionType = useCallback(async (value: string) => {
    const [transactionType] = getDefaultTransactionTypes().filter(type => type.slug === value)
    const categoriesResponse = await request(`/category/type/${transactionType.id}`, { cache: 'no-store' })
    const categories = await categoriesResponse.json()
    
    setSelectedTransactionType(transactionType)
    setCategories(categories)
  }, [getDefaultTransactionTypes, setCategories])
  
  return (
    <>
      <div className="flex justify-between mt-6">
        <Select
          onValueChange={handleSelectTransactionType}
          defaultValue={transactionTypeSelected.slug}
          aria-label="Categories type"
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {getDefaultTransactionTypes().map((type) => (
              <SelectItem key={type.id} value={type.slug}>
                {type.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <ButtonNewItem sheetTitle="Categoria" buttonTitle="Adicionar categoria" />
      </div>
      
      <CategoryList />
      
      <SheetForm>
        {sheet.selected.name}
      </SheetForm>
    </>
  )
}

export default CategoryData