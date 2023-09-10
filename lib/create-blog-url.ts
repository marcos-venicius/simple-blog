export function createBlogUrl(slug: string): string {
  const origin = window.location.origin

  return `${origin}/blogs/${slug}`
}
