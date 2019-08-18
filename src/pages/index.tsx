import React, { FunctionComponent } from 'react'
import { Link, graphql } from 'gatsby'

import { Bio } from '../components/bio'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import styled from 'styled-components'

const Post = styled.div`
  margin-bottom: ${({ theme }: Styled) => theme.typography.rhythm(2)};
`

const Title = styled.h3`
  ${({ theme }: Styled) => theme.typography.scale(0.8)}
  margin-bottom: ${({ theme }: Styled) => theme.typography.rhythm(0.1)};
`

const Published = styled.small`
  color: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.5)};
`

const BlogIndex: FunctionComponent<{ data: any; location: Location }> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }: { node: any }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Post key={node.fields.slug}>
            <Title>
              <Link to={node.fields.slug}>{title}</Link>
            </Title>
            <div>{node.frontmatter.description || node.excerpt}</div>
            <Published>{node.frontmatter.date}</Published>
          </Post>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
