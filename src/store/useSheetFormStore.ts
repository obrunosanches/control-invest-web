import { create } from 'zustand'

import type { PageActions } from '@/types/pages'

type SheetOption = {
  action: PageActions
  selected: any
  title: string
}

type State = {
  sheet: SheetOption & {
    toggle: boolean
  }
}

type Actions = {
  actions: {
    setSheetToggle: (data: boolean) => void
    setSheetOptions: (data: SheetOption) => void
  }
}

type Getters = {
  getters: {}
}

export const useSheetFormStore = create<State & Actions & Getters>()((set, get) => ({
  sheet: {
    action: 'new',
    toggle: false,
    title: '',
    selected: {}
  },
  getters: {},
  actions: {
    setSheetToggle: (data) => {
      return set({
        sheet: {
          ...get().sheet,
          toggle: data
        }
      })
    },
    setSheetOptions: (data) => {
      return set({
        sheet: {
          ...get().sheet,
          ...data
        }
      })
    },
  }
}))
