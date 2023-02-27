import {defineStore} from "pinia";
import {CategoryType} from "@prisma/client";

interface State {
  categoryTypes: CategoryType[]
  itemSelected: CategoryType | null
}

export const useCategoryTypeStore = defineStore('category-type', {
  state: (): State => ({
    categoryTypes: [],
    itemSelected: null
  }),
  getters: {},
  actions: {
    async fetch(): Promise<void> {
      try {
        this.categoryTypes = await $fetch<CategoryType[]>('/api/category/type')
      } catch (error) {
        console.error(error)
      }
    },
    selectedItem(id: string | null): void {
      if (!id) {
        this.itemSelected = null
        return
      }

      this.itemSelected = this.categoryTypes.find(item => item.id === id) as CategoryType
    }
  }
})