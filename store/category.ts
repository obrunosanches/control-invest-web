import { defineStore } from "pinia"
import type { Category, CategoryType } from "@prisma/client"

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
      await $fetch<CategoryType[]>(`/api/category/${categoryTypeId}`)
    }
  }
})