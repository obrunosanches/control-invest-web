import { request } from '@/server/request'

import type { CategoryProps } from '@/types/schema'

export async function createOrUpdateCategory(category: CategoryProps): Promise<any> {
  const apiUrl = `/category${category.id ? `/${category.id}` : ''}`
  const categoryData: CategoryProps = {
    ...(category.id && { id: category.id }),
    name: category.name,
    type_id: category.type_id
  }
  
  try {
    const response = await request(apiUrl, {
      method: category.id ? 'PUT' : 'POST',
      body: JSON.stringify(categoryData)
    })
    
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export async function deleteCategory(category: number){
  try {
    await request(`/category/${category}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.log(error)
  }
}