---
title: Blog init
date: '2019-08-16T13:12:03.284Z'
description: 'Why create this blog and the tech stack I used.'
---

Through this short blog post I'll go into details of why I wanted to create a personal blog, why didn't I just use [medium](https://medium.com) and why I chose [Gatsby](https://gatsbyjs.org) as the blog's framework.

## One first

- First one
- Second one

1. First one
2. Second one

| name   | title     |
| ------ | --------- |
| `true` | `require` |

Try inside regular `text`, or maybe **bold** and _italic_

<!-- prettier-ignore-start -->
```jsx {11-14}
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        />
      <Title>{post.frontmatter.title}</Title>
      <Published>{post.frontmatter.date}</Published>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <Divider />
      <Bio />
      <PaginationList>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              <Icon.Back />
              <span>{previous.frontmatter.title}</span>
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              <span>{next.frontmatter.title}</span>
              <Icon.Forward />
            </Link>
          )}
        </li>
      </PaginationList>
    </Layout>
  )
}
```
<!-- prettier-ignore-end -->
