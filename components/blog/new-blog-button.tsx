'use client'

import { Button } from '@/components/ui/button'
import { ModalType, useModal } from '@/hooks/use-modal'

export function NewBlogButton() {
  const modal = useModal()

  return <Button onClick={modal.onOpen.bind(null, ModalType.CreateBlog)}>novo blog</Button>
}
