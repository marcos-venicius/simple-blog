import * as z from 'zod'

export const createBlogSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: 'O nome do Blog é obrigatório'
    })
    .max(30, {
      message: 'O nome do Blog deve ter no máximo 30 caracteres'
    }),
  logoUrl: z.string().trim().min(1, {
    message: 'A logo do Blog é obrigatória'
  })
})

export type CreateBlogSchemaInput = z.input<typeof createBlogSchema>
