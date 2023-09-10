import { generateBlogSlug } from '@/lib/generate-blog-slug'
import { createBlogSchema } from '@/schemas/blog/create-blog-schema'
import { BlogService } from '@/services/blog.service'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const data = await req.json()

    const { logoUrl, name } = await createBlogSchema.parseAsync(data)

    const slug = generateBlogSlug(name)

    const alreadyExistsBlogWithTheSameSlug = await BlogService.checkIfExistsWithSlug(slug)

    if (alreadyExistsBlogWithTheSameSlug) {
      return new NextResponse('Já existe um blog com essa URL de acesso')
    }

    const blogId = await BlogService.create({
      logoUrl,
      name,
      slug,
      userId
    })

    return NextResponse.json(blogId, { status: 201 })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error(error)

    if (error instanceof ZodError) return NextResponse.json(error.errors, { status: 400 })

    return new NextResponse('Internal Error', { status: 500 })
  }
}
