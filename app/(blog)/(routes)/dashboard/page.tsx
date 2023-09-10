import { BlogCard } from '@/components/blog/blog-card'
import { NewBlogButton } from '@/components/blog/new-blog-button'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

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
          <BlogCard blog={blog} />
        ))}
      </section>
    </main>
  )
}
