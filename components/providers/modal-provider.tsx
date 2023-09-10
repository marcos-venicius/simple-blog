'use client'

import { useEffect, useState } from 'react'
import { CreateBlogModal } from '../modals/create-blog-modal'
import { DeleteBlogModal } from '../modals/delete-blog-modal'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CreateBlogModal />
      <DeleteBlogModal />
    </>
  )
}
