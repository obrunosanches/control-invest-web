'use client'

import { useCallback, useState } from 'react'

import type { TransactionTypeProps } from '@/types/schema'
import type { TransactionOptions } from '@/types/database'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { fetchCategories } from '@/services/category'

import CategoryList from '@/components/layout/category/list'
import ButtonNewItem from '@/components/layout/button-new-item'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ContainerSheetForm from '@/components/layout/category/container-sheet-form'

function CategoryData() {
  const { getTransactionTypeBySlug, getDefaultTransactionTypes } = useCIStore((store) => store.getters)
  const setCategories = useCIStore((store) => store.actions.setCategories)
  
  const transactionTypesDefault = getDefaultTransactionTypes()
  
  const [transactionTypeSelected, setSelectedTransactionType] = useState<TransactionTypeProps>(
    transactionTypesDefault[0]
  )
  
  const refreshCategories = useCallback(() => {
    new Promise(async (resolve) => {
      if (transactionTypeSelected.id) {
        const categories = await fetchCategories(transactionTypeSelected.id)
        
        setCategories(categories)
        resolve(categories)
      }
    }).catch(e => console.log(e))
  },[setCategories, transactionTypeSelected.id])
  
  const handleSelectTransactionType = useCallback(async (slug: TransactionOptions) => {
    const transactionType = getTransactionTypeBySlug(slug)
    
    if (transactionType?.id) {
      const categories = await fetchCategories(transactionType.id)
      setSelectedTransactionType(transactionType)
      
      setCategories(categories)
    }
  }, [getTransactionTypeBySlug, setCategories])
  
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
      
      <ContainerSheetForm
        transactionTypeSelected={transactionTypeSelected}
        onConfirm={refreshCategories}
      />
    </>
  )
}

export default CategoryData