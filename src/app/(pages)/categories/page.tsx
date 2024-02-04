import { Suspense } from 'react'

import { request } from '@/server/request'

import StoreInitializer from '@/components/layout/store-initializer'
import CategoryData from '@/components/layout/category/data'

async function CategoryInitializer() {
  const categoriesResponse = await request('/category', { cache: 'no-store' })
  const transactionTypesResponse = await request('/transaction-type', { cache: 'no-store' })
  
  const categories = await categoriesResponse.json()
  const transactionTypes = await transactionTypesResponse.json()
  
  return {
    categories,
    transactionTypes
  }
}

export default async function Categories() {
  const { transactionTypes, categories } = await CategoryInitializer()
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        Categorias
      </h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <StoreInitializer
          categories={categories}
          transactionTypes={transactionTypes}
        >
          <CategoryData />
        </StoreInitializer>
      </Suspense>
    </>
  )
}
