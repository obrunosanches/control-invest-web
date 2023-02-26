import {defineStore} from "pinia";
import {CategoryType} from "@prisma/client";

interface State {
  categoryTypes: CategoryType[]
  itemSelected: CategoryType | {}
}

export const useCategoryTypeStore = defineStore('category-type', {
  state: (): State => ({
    categoryTypes: [],
    itemSelected: {}
  }),
  getters: {},
  actions: {
    async fetch(): Promise<void> {
      try {
        this.categoryTypes = await $fetch<CategoryType[]>('/api/category/type')
      } catch (error) {
        console.error(error)
      }
    }
  }
})