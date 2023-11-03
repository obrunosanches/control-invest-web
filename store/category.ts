import { defineStore } from "pinia"

import type { Category, CategoryType } from "@prisma/client"
import { useCategoryTypeStore } from "~/store/categoryType"

export interface CategoryWithType extends Category {
  categoryType: CategoryType
}

interface State {
  categories: CategoryWithType[]
}

export const useCategoryStore = defineStore('categoryStore', {
  state: (): State => ({
    categories: []
  }),
  actions: {
    async fetchCategoriesByType(categoryTypeId) {
      try {
        this.categories = await $fetch<CategoryType[]>(`/api/category/${categoryTypeId}`)
        
      } catch (error) {
        console.error(error)
      }
    },
    async createOrUpdateCategory(category: Category) {
      const { categoryTypes } = useCategoryTypeStore()
      const apiUrl = `/api/category${category.id ? `/${category.id}` : ''}`
      
      try {
        const response = await $fetch<Category>(apiUrl, {
          method: category.id ? 'PUT' : 'POST',
          body: {
            name: category.name,
            typeId: category.typeId
          }
        })
        
        if (category.id) {
          return await this.fetchCategoriesByType(category.typeId)
        }
        
        const categoryType = categoryTypes.find(
          type => type.id === response.typeId
        )
        
        this.categories.push({ ...response, categoryType })
      } catch (error) {
        console.error(error)
      }
    }
  }
})