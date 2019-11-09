import React, { FunctionComponent } from 'react'
import { Link as GLink, graphql } from 'gatsby'

import { Bio } from '../components/bio'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import styled from 'styled-components'
import { Icon } from '../components/icon'

const Title = styled.h1`
  ${({ theme }) => theme.scale(1.5)}
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`

const Published = styled.p`
  ${({ theme }) => theme.scale(-1 / 5)}
  display: block;
  color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.5 })};
  margin-bottom: 0;
  border-left: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.5 })} 1px solid;
  padding-left: ${({ theme }) => theme.spacing(0.2)};

  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`

const Divider = styled.hr`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

const PaginationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin-left: 0;
`

const Link = styled(GLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  & > *:first-child {
    margin-right: ${({ theme }) => theme.spacing(1 / 4)};
  }
`

interface BlogPost {
  data: {
    site: {
      siteMetadata: {
        title: string
        author: string
      }
    }
    markdownRemark: {
      id: string
      excerpt: string
      html: string
      frontmatter: {
        title: string
        created: string
        edited: string
        description: string
      }
    }
  }
  pageContext: {
    previous: PostEdge['node']
    next: PostEdge['node']
  }
}

const BlogPostTemplate: FunctionComponent<BlogPost> = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <Title>{post.frontmatter.title}</Title>
      <Published>
        <time dateTime={post.frontmatter.created}>{post.frontmatter.created}</time>
      </Published>
      {post.frontmatter.created !== post.frontmatter.edited && (
        <Published>
          <time dateTime={post.frontmatter.edited}>{post.frontmatter.edited}</time> (updated)
        </Published>
      )}
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        created(formatString: "DD MMM YYYY, HH:mm")
        edited(formatString: "DD MMM YYYY, HH:mm")
        description
      }
    }
  }
`
