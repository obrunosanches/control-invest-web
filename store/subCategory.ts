import { defineStore } from "pinia"

import type { SubCategory } from "@prisma/client"
import { Category } from "@prisma/client"
import { useCategoryStore } from "~/store/category"

interface State {
  subCategories: SubCategory[]
}

export const useSubCategoryStore = defineStore('subCategoryStore', {
  state: (): State => ({
    subCategories: []
  }),
  actions: {
    async createOrUpdateSubCategory(subCategory: SubCategory) {
      const { categories, fetchCategoriesByType } = useCategoryStore()
      const apiUrl = `/api/category/${subCategory.categoryId}/sub-category${subCategory.id ? `/${subCategory.id}` : ''}`
      
      try {
        const response = await $fetch<Category>(apiUrl, {
          method: subCategory.id ? 'PUT' : 'POST',
          body: {
            name: subCategory.name,
            categoryId: subCategory.categoryId
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        const category = categories.find(item => item.id === subCategory.categoryId)
        
        if (category) {
          await fetchCategoriesByType(category.typeId)
        }
      }
    }
  }
})