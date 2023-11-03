import { defineStore } from "pinia"

import type { CategoryType } from "@prisma/client"

interface State {
  categoryTypes: CategoryType[]
}

export const useCategoryTypeStore = defineStore('categoryTypeStore', {
  state: (): State => ({
    categoryTypes: []
  }),
  actions: {
    async fetchCategoryTypes() {
      try {
        this.categoryTypes = await $fetch<CategoryType[]>('/api/category/type')
      } catch (error) {
        console.error(error)
      }
    }
  }
})