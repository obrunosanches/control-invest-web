'use client'

import { useCallback, useState } from 'react'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { request } from '@/server/request'

import CategoryList from '@/components/layout/category/list'
import ButtonNewItem from '@/components/layout/button-new-item'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ContainerSheetForm from '@/components/layout/category/container-sheet-form'

import type { TransactionTypeProps } from '@/types/schema'
import type { TransactionSlug } from '@/types/database'

function CategoryData() {
  const store = useCIStore((store) => store)
  const transactionTypesDefault = store.getters.getDefaultTransactionTypes()
  
  const [transactionTypeSelected, setSelectedTransactionType] = useState<TransactionTypeProps>(
    transactionTypesDefault[0]
  )
  
  const fetchCategories = useCallback(async (typeId: number) => {
    const categoriesResponse = await request(`/category/type/${typeId}`, { cache: 'no-store' })
    const categories = await categoriesResponse.json()
    
    store.actions.setCategories(categories)
  }, [store.actions])
  
  const refreshCategories = useCallback(() => {
    new Promise(async (resolve) => {
      if (transactionTypeSelected.id) {
        resolve(await fetchCategories(transactionTypeSelected.id))
      }
    }).catch(e => console.log(e))
  },[fetchCategories, transactionTypeSelected.id])
  
  const handleSelectTransactionType = useCallback(async (slug: TransactionSlug) => {
    const transactionType = transactionTypesDefault.find(type => type.slug === slug)
    
    if (transactionType?.id) {
      await fetchCategories(transactionType.id)
      setSelectedTransactionType(transactionType)
    }
  }, [transactionTypesDefault, fetchCategories])
  
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