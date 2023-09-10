import { generateComponents } from '@uploadthing/react'

import type { UploadthingRouter } from '@/app/api/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<UploadthingRouter>()
