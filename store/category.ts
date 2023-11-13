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
  getters: {
    getCategory(state) {
      return (id: string) => state.categories.find((category) => category.id === id)
    }
  },
  actions: {
    async fetchCategoriesByType(categoryTypeId) {
      if (!categoryTypeId) {
        return void 0
      }
      
      try {
        this.categories = await $fetch<CategoryWithIncludes[]>(`/api/category?type=${categoryTypeId}`)
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