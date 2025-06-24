'use client'

import Header from '@/components/Header'
import { useZenMode } from './zen-context'

export default function ConditionalHeader() {
  const { isZenMode } = useZenMode()

  if (isZenMode) {
    return null
  }

  return <Header />
}
