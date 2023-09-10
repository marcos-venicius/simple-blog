import { NewBlogButton } from '@/components/blog/new-blog-button'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import { Send, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await currentUser()

  const blogs = await db.blog.findMany({
    where: {
      userId: user?.id
    }
  })

  return (
    <main className='w-full h-full p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='block font-bold text-4xl'>Meus Blogs</h1>

        <NewBlogButton />
      </div>

      <section className='pt-8 flex flex-wrap gap-5'>
        {blogs.length === 0 && <p>Você não criou nenhum blog ainda</p>}

        {blogs.map(blog => (
          <div className='p-6 rounded-lg border dark:border-zinc-700 relative'>
            <Button className='absolute top-0 left-0 rounded-none rounded-br rounded-tl bg-transparent opacity-30 hover:opacity-100 transition-opacity hover:bg-transparent z-10'>
              <Settings className='text-foreground' />
            </Button>

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
              <Button>
                <Send className='w-4 h-4 mr-3' />
                postar
              </Button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
