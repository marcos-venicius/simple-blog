import { ExternalLink, FilePlus2, Library, Send, Settings, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Blog } from '@prisma/client'

type Props = {
  blog: Blog
}

export function BlogCard({ blog }: Props) {
  return (
    <div className='p-6 rounded-lg border dark:border-zinc-700'>
      <div className='w-40 h-40 mx-auto relative'>
        <Image
          fill
          src={blog.logoUrl}
          alt={blog.name}
          className='rounded-full'
        />
      </div>
      <h1 className='font-bold text-xl text-center mt-8'>{blog.name}</h1>
      <Link
        href={`/blogs/${blog.slug}`}
        className='text-zinc-500 text-xs mt-8 hover:underline'>
        /blogs/{blog.slug}
      </Link>

      <div className='mt-8 w-full flex items-center gap-2 justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings className='text-foreground' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='cursor-pointer'>
              <ExternalLink className='w-4 h-4 mr-2' />
              Abrir
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Library className='w-4 h-4 mr-2' />
              Posts
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <FilePlus2 className='w-4 h-4 mr-2' />
              Novo post
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Settings className='w-4 h-4 mr-2' />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer text-red-500 hover:text-red-400 focus-visible:text-red-400'>
              <Trash className='text-red-500 w-4 h-4 mr-2' />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
