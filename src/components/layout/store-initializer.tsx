'use client'

import { useRef } from 'react'

import { useAppStore } from '@/store'
import { StoreState } from '@/store/types'

function StoreInitializer({ state }: { state: StoreState }) {
  const initialized = useRef(false)
  
  if (!initialized.current) {
    useAppStore.setState({ state })
    initialized.current = true
  }
  
  return null
}

export default StoreInitializer
