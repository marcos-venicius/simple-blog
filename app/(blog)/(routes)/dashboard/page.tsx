import { NewBlogButton } from '@/components/blog/new-blog-button'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'

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
          <button className='p-6 rounded-lg border dark:border-zinc-700 cursor-pointer hover:opacity-75 transition-opacity'>
            <div className='w-40 h-40 mx-auto relative'>
              <Image
                fill
                src={blog.logoUrl}
                alt={blog.name}
                className='rounded-full'
              />
            </div>
            <h1 className='font-bold text-xl text-center mt-8'>{blog.name}</h1>
            <p className='text-zinc-500 text-xs mt-8'>/blogs/{blog.slug}</p>
          </button>
        ))}
      </section>
    </main>
  )
}
