import { create } from 'zustand'

import type { CategoryWithRelationsProps } from '@/types/schema'

type State = {
  categories: CategoryWithRelationsProps[]
}

type Actions = {
  actions: {
    setCategories: (data: CategoryWithRelationsProps[]) => void
  }
}

type Getters = {
  getters: {}
}

export const useCategoryStore = create<State & Actions & Getters>()((set, get) => ({
  categories: [],
  getters: {},
  actions: {
    setCategories: (data) => {
      return set({ categories: data })
    }
  }
}))
