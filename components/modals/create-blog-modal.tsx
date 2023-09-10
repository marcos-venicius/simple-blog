'use client'

import axios, { AxiosError } from 'axios'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ModalType, useModal } from '@/hooks/use-modal'
import { generateBlogSlug } from '@/lib/generate-blog-slug'
import { createBlogUrl } from '@/lib/create-blog-url'
import { CreateBlogSchemaInput, createBlogSchema } from '@/schemas/blog/create-blog-schema'
import { useToast } from '@/components/ui/use-toast'

export function CreateBlogModal() {
  const { toast } = useToast()
  const modal = useModal()
  const router = useRouter()
  const [blogSlug, setBlogSlug] = useState('')
  const form = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      name: '',
      logoUrl: ''
    }
  })

  const name = form.watch('name')

  const [loading, setLoading] = useState(false)
  const [availabilityVerified, setAvailabilityVerified] = useState(false)

  async function onSubmit(data: CreateBlogSchemaInput) {
    setLoading(true)

    try {
      await axios.post('/api/blogs', data)

      toast({
        title: 'Eba!',
        description: 'Você já pode postar no seu novo blog!',
        duration: 3000
      })
      form.reset()
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

    form.reset()
    modal.onClose()
    setAvailabilityVerified(false)
    setBlogSlug('')
  }

  async function checkAvailability() {
    setLoading(true)

    try {
      const response = await axios.post('/api/blogs/availability/check', {
        name
      })

      if (response.status === 200) {
        setAvailabilityVerified(true)

        toast({
          title: 'Sucesso!!!',
          description: 'Vimos que o endereço para seu novo blog está disponível!',
          duration: 3000
        })
      } else {
        toast({
          variant: 'destructive',
          title: '.....',
          description: 'Parece que algo deu errado. Que tal tentar novamente mais tarde?',
          duration: 3000
        })
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast({
          title: 'Um pequeno probleminha',
          description: 'Parece que alguém já criou um blog com essa mesma URL de acesso, acredita?',
          variant: 'destructive',
          duration: 3000
        })
      } else {
        toast({
          title: ':(',
          description: 'Ouve um erro interno. Tente novamente mais tarde.',
          variant: 'destructive',
          duration: 3000
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setBlogSlug(generateBlogSlug(name))
  }, [name])

  useEffect(() => {
    if (availabilityVerified) setAvailabilityVerified(false)
  }, [name])

  return (
    <Dialog
      open={(modal.isOpen && modal.type === ModalType.CreateBlog) || loading}
      onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>Novo Blog</DialogTitle>
          <DialogDescription className='text-center leading-relaxed mt-3'>
            Crie um novo blog e tenha onde postar seus pensamentos e argumentos com total liberdade
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  control={form.control}
                  name='logoUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          value={field.value}
                          onChange={field.onChange}
                          disabled={loading}
                          endpoint='blogImage'
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs uppercase text-zinc-500'>Nome do Blog</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='nome do blog...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              {blogSlug.length > 0 && (
                <p className='text-zinc-500 text-xs'>
                  <strong className='text-foreground'>URL de acesso: </strong>
                  {createBlogUrl(blogSlug)}
                </p>
              )}
            </div>
            <DialogFooter className='px-6 py-4'>
              {availabilityVerified ? (
                <Button loading={loading}>criar</Button>
              ) : (
                <Button
                  type='button'
                  disabled={blogSlug.length === 0}
                  onClick={checkAvailability}
                  loading={loading}>
                  verificar disponibilidade
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
