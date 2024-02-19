import { request } from '@/server/request'

import type { SubCategoryProps } from '@/types/schema'

export async function createOrUpdateSubCategory(subCategory: SubCategoryProps): Promise<any> {
  const apiUrl = `/category/sub${subCategory.id ? `/${subCategory.id}` : ''}`
  
  const subCategoryData: SubCategoryProps = {
    ...(subCategory.id && { id: subCategory.id }),
    name: subCategory.name,
    category_id: subCategory.category_id
  }

  try {
    const response = await request(apiUrl, {
      method: subCategory.id ? 'PUT' : 'POST',
      body: JSON.stringify(subCategoryData)
    })

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export async function deleteSubCategory(subCategoryId: number){
  try {
    await request(`/category/sub/${subCategoryId}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.log(error)
  }
}