import { defineStore } from "pinia"

import type { Category, CategoryType, SubCategory } from "@prisma/client"

export interface CategoryWithIncludes extends Category {
  type: CategoryType
  subCategory: SubCategory[]
}

interface State {
  categories: CategoryWithIncludes[]
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
      const apiUrl = `/api/category${category.id ? `/${category.id}` : ''}`
      
      try {
        const response = await $fetch<Category>(apiUrl, {
          method: category.id ? 'PUT' : 'POST',
          body: {
            name: category.name,
            typeId: category.typeId
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        await this.fetchCategoriesByType(category.typeId)
      }
    },
    async deleteCategory(category: Category) {
        try {
          await $fetch(`/api/category/${category.id}`, {
            method: 'DELETE'
          })
          
        } catch (error) {
          console.log(error)
        } finally {
          await this.fetchCategoriesByType(category.typeId)
        }
     }
  }
})