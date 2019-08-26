import React, { FunctionComponent } from 'react'
import { Link as GLink, graphql } from 'gatsby'

import { Bio } from '../components/bio'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import styled from 'styled-components'
import { Icon } from '../components/icon'

const Title = styled.h1`
  ${({ theme }: Styled) => theme.typography.scale(1.5)}
  margin-top: ${({ theme }: Styled) => theme.typography.rhythm(1)};
  margin-bottom: 0;
`

const Published = styled.p`
  ${({ theme }: Styled) => theme.typography.scale(-1 / 5)}
  margin-bottom: ${({ theme }: Styled) => theme.typography.rhythm(1)};
  display: block;
  color: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.5)};
`

const Divider = styled.hr`
  margin-bottom: ${({ theme }: Styled) => theme.typography.rhythm(1)};
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
    margin-right: ${({ theme }: Styled) => theme.typography.rhythm(1 / 4)};
  }
`

const BlogPostTemplate: FunctionComponent<{ data: any; pageContext: any; location: Location }> = ({
  data,
  pageContext,
  location,
}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <Title>{post.frontmatter.title}</Title>
      <Published>{post.frontmatter.created}</Published>
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
        created(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
