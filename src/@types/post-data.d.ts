declare interface PostData {
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    created: string
    title: string
    description: string
  }
}
