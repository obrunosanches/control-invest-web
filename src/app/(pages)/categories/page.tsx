import { Suspense } from 'react'

import CategoryData from '@/components/layout/category/data'

export default async function Categories() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        Categorias
      </h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryData />
      </Suspense>
    </>
  )
}
