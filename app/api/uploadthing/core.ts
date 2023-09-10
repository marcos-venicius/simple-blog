import { auth } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

function handleAuth() {
  const { userId } = auth()

  if (!userId) throw new Error('Unauthorized')

  return { userId }
}

export const uploadthingRouter = {
  blogImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1
    }
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {})
} satisfies FileRouter

export type UploadthingRouter = typeof uploadthingRouter
