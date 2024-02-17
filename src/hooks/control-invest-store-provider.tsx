'use client'

import { createContext, useRef, useContext } from 'react'
import { StoreApi, useStore } from 'zustand'

import { createCIStore } from '@/store/control-invest-store'

import { type PropsWithChildren } from 'react'
import type { CIStore } from '@/types/store'

export const CIStoreContext = createContext<StoreApi<CIStore> | null>(null)

export const CIStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<CIStore>>()
  
  if (!storeRef.current) {
    storeRef.current = createCIStore()
  }
  
  return (
    <CIStoreContext.Provider value={storeRef.current}>
      {children}
    </CIStoreContext.Provider>
  )
}

export const useCIStore = <T,>(
  selector: (store: CIStore) => T
): T => {
  const store = useContext(CIStoreContext)
  
  if (!store) {
    throw new Error('useCIStore must be use within CIStoreContext')
  }
  
  return useStore(store, selector)
}
