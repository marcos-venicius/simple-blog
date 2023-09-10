import { BlogService } from '@/services/blog.service'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

type DeleteParams = {
  params: {
    blogId: string
  }
}

export async function DELETE(req: Request, { params }: DeleteParams) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const blogBelongsToTheRequestingUser = await BlogService.checkIfBelongsToAnUser(
      params.blogId,
      userId
    )

    if (!blogBelongsToTheRequestingUser) {
      return new NextResponse('Este blog não pertence a você.', { status: 403 })
    }

    await BlogService.delete(params.blogId)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }

    return new NextResponse('Internal Error', { status: 500 })
  }
}
