import {defineStore} from "pinia";
import {CategoryType} from "@prisma/client";

interface State {
  categoryTypes: CategoryType[]
  categoryTypeSelected: CategoryType | null
}

export const useCategoryTypeStore = defineStore('category-type', {
  state: (): State => ({
    categoryTypes: [],
    categoryTypeSelected: null
  }),
  getters: {
    getCategoryTypeById: (state) => {
      return (id: string | null) => {
        if (!id) {
          state.categoryTypeSelected = null
          return
        }

        state.categoryTypeSelected = state.categoryTypes.find(item => item.id === id) as CategoryType
      }
    }
  },
  actions: {
    async fetchCategoryTypes(): Promise<void> {
      try {
        this.categoryTypes = await $fetch<CategoryType[]>('/api/category/type')
      } catch (error) {
        console.error(error)
      }
    }
  }
})