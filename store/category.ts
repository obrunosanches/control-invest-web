import { defineStore } from "pinia"

import type { Category, TransactionType, SubCategory } from "@prisma/client"

export interface CategoryWithIncludes extends Category {
  type: TransactionType
  subCategory: SubCategory[]
}

interface State {
  categories: CategoryWithIncludes[]
}

export const useCategoryStore = defineStore('categoryStore', {
  state: (): State => ({
    categories: []
  }),
  getters: {
    getCategory(state) {
      return (id: string) => state.categories.find((category) => category.id === id)
    }
  },
  actions: {
    async fetchCategoriesByType(typeId): Promise<CategoryWithIncludes[]> {
      if (!typeId) {
        return void 0
      }
      
      try {
        const categories = await $fetch<CategoryWithIncludes[]>(`/api/category?type=${typeId}`)
        
        this.categories = categories
        
        return categories
      } catch (error) {
        console.error(error)
      }
    },
    async createOrUpdateCategory(category: Category) {
      const apiUrl = `/api/category${category.id ? `/${category.id}` : ''}`
      
      try {
        await $fetch<Category>(apiUrl, {
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