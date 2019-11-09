declare interface PostEdge {
  node: PostData
}

declare interface PageData {
  site: {
    siteMetadata: SiteMetadata
  }
  allMarkdownRemark: {
    edges: PostEdge[]
  }
}
