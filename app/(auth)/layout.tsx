import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return <main className='h-full flex items-center justify-center'>{children}</main>
}
