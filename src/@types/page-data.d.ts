declare interface PostEdge {
  node: {
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
}

declare interface PageData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: PostEdge[]
  }
}
