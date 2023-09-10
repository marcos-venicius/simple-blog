import { db } from '@/lib/db'
import { generateBlogSlug } from '@/lib/generate-blog-slug'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data.name) return new NextResponse('Invalid data', { status: 400 })

    const slug = generateBlogSlug(data.name)

    if (slug.length === 0) return new NextResponse('Invalid blog name', { status: 500 })

    const blogWithSameSlug = await db.blog.findUnique({
      where: {
        slug
      }
    })

    if (blogWithSameSlug) {
      return new NextResponse('Já existe um blog com esse slug', { status: 409 })
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
