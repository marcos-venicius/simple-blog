import { createNextRouteHandler } from 'uploadthing/next'
import { uploadthingRouter } from './core'

export const { GET, POST } = createNextRouteHandler({
  router: uploadthingRouter
})
