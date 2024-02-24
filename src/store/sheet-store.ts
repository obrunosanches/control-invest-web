import { create } from 'zustand'

import { PageActions, PagesSources } from '@/types/pages'

export type SheetOption = {
  action: PageActions
  selected: any
  title: string
  pageSource: PagesSources | null
}

export type State = {
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

type Store = State & Actions & Getters

export const useSheetStore = create<Store>((setState, getState) => ({
  sheet: {
    action: 'new',
    toggle: false,
    title: '',
    selected: {},
    pageSource: null
  },
  getters: {},
  actions: {
    setSheetToggle: (data) => {
      return setState({
        sheet: {
          ...getState().sheet,
          toggle: data
        }
      })
    },
    setSheetOptions: (data) => {
      return setState({
        sheet: {
          ...getState().sheet,
          ...data
        }
      })
    },
  }
}))
