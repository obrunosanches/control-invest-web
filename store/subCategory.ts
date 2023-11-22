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
      const apiUrl = `/api/category/${subCategory.categoryId}/sub-category${subCategory.id ? `/${subCategory.id}` : ''}`
      
      try {
        await $fetch<Category>(apiUrl, {
          method: subCategory.id ? 'PUT' : 'POST',
          body: {
            name: subCategory.name,
            categoryId: subCategory.categoryId
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        const { getCategory, fetchCategoriesByType } = useCategoryStore()
        
        const category = getCategory(subCategory.categoryId)
        
        if (category) {
          await fetchCategoriesByType(category.typeId)
        }
      }
    },
    async deleteSubCategory(subCategory: SubCategory) {
      try {
        await $fetch(`/api/category/${subCategory.categoryId}/sub-category/${subCategory.id}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      } finally {
        const { getCategory, fetchCategoriesByType } = useCategoryStore()
        
        const category = getCategory(subCategory.categoryId)
        
        if (category) {
          await fetchCategoriesByType(category.typeId)
        }
      }
    }
  }
})