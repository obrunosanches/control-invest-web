import {defineStore} from "pinia";
import {Category} from "@prisma/client";

interface State {
  categories: Category[]
}

export const useCategoryStore = defineStore('category', {
  state: (): State => ({
    categories: []
  }),
  getters: {},
  actions: {
    async fetchByType(typeId: string): Promise<void> {
      try {
        this.categories = await $fetch<Category[]>(`/api/category/type/${typeId}`)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
