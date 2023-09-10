'use client'

import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ModalType, useModal } from '@/hooks/use-modal'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '../ui/label'

export function DeleteBlogModal() {
  const { toast } = useToast()
  const modal = useModal<ModalType.DeleteBlog>()
  const router = useRouter()
  const [blogSlug, setBlogSlug] = useState('')

  const [loading, setLoading] = useState(false)

  async function onDelete() {
    setLoading(true)

    try {
      await axios.delete(`/api/blogs/${modal.data?.id}`)

      toast({
        description: 'Seu blog foi deletado permanentemente!',
        duration: 2000
      })
      router.refresh()
      modal.onClose()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops!',
        description: 'Algo deu errado. Tente novamente mais tarde.',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    if (loading) return

    modal.onClose()
    setBlogSlug('')
  }

  return (
    <Dialog
      open={(modal.isOpen && modal.type === ModalType.DeleteBlog) || loading}
      onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>Deletar Blog</DialogTitle>
          <DialogDescription className='text-center leading-relaxed mt-5 block'>
            Tem certeza que deseja deletar o Blog{' '}
            <span className='font-mono p-1 whitespace-nowrap text-red-500'>{modal.data?.slug}</span>{' '}
            permanentemente?
            <br />
            <strong className='text-red-500 mt-2 block'>
              todo o conteúdo do blog será apagado e não poderá ser restaurado
            </strong>
          </DialogDescription>
        </DialogHeader>
        <Label
          htmlFor='field'
          className='text-zinc-500'>
          digite a url do blog no campo abaixo para prosseguir
        </Label>
        <Input
          id='field'
          disabled={loading}
          value={blogSlug}
          autoCapitalize='off'
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}
          onChange={event => setBlogSlug(event.target.value)}
          placeholder={modal.data?.slug}
        />
        <DialogFooter className='py-4'>
          <Button
            disabled={blogSlug !== modal.data?.slug}
            loading={loading}
            onClick={onDelete}
            variant='destructive'>
            deletar permanentemente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
