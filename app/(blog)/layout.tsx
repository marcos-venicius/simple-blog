import { Header } from '@/components/header'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <main className='w-full h-full flex flex-col'>
      <Header />
      {children}
    </main>
  )
}
