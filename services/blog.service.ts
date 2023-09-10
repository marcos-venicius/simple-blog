import { db } from '@/lib/db'

export class BlogService {
  /**
   * check if already exists a blog with same slug
   * @param slug slug to search
   * @returns true of false
   */
  public static async checkIfExistsWithSlug(slug: string): Promise<boolean> {
    const count = await db.blog.count({
      where: {
        slug
      }
    })

    return count > 0
  }

  /**
   * create a new blog
   * @returns the blog id
   */
  public static async create({ logoUrl, name, slug, userId }: CreateInput): Promise<string> {
    const { id } = await db.blog.create({
      data: {
        logoUrl,
        name,
        slug,
        userId
      },
      select: {
        id: true
      }
    })

    return id
  }
}

type CreateInput = {
  name: string
  slug: string
  logoUrl: string
  userId: string
}
