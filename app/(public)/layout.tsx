import { Header } from '@/components/header'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function PublicLayout({ children }: Props) {
  return (
    <main className='w-full h-full'>
      <Header />
      {children}
    </main>
  )
}
