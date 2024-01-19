'use client'

import { useRef } from 'react'
import { StoreState, useAppStore } from '@/store'

function StoreInitializer({ state }: { state: StoreState }) {
  const initialized = useRef(false)
  
  if (!initialized.current) {
    useAppStore.setState({ state })
    initialized.current = true
  }
  
  return null
}

export default StoreInitializer
