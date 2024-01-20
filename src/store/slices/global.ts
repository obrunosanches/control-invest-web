import { StateCreator } from 'zustand'

import type { PageActions } from '@/types/pages'

type SheetOption = {
  action: PageActions
  selected: any
  title: string
}

export type SliceStateGlobal = {
  sheet: SheetOption & {
    toggle: boolean
  }
}

export type SliceActionsGlobal = {
  setSheetToggle: (data: boolean) => void
  setSheetOptions: (data: SheetOption) => void
}

export interface SliceStoreGlobal {
  state: SliceStateGlobal,
  actions: SliceActionsGlobal
}

export const globalSlice: StateCreator<SliceStoreGlobal> = (set) => ({
  state: {
    sheet: {
      action: 'new',
      toggle: false,
      title: '',
      selected: {}
    }
  },
  actions: {
    setSheetToggle: (data) =>
      set((state) => ({
        state: {
          ...state.state,
          sheet: {
            ...state.state.sheet,
            toggle: data
          }
        }
      })),
    setSheetOptions: (data) =>
      set((state) => ({
        state: {
          ...state.state,
          sheet: {
            ...state.state.sheet,
            ...data
          }
        }
      }))
  }
})