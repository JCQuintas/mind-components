import React, { FunctionComponent } from 'react'
import { Link, graphql } from 'gatsby'
import { Bio } from '../components/bio'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import styled from 'styled-components'

const Post = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

const Title = styled.h3`
  ${({ theme }) => theme.scale(0.8)}
  margin-bottom: ${({ theme }) => theme.spacing(0.1)};
  color: ${({ theme }) => theme.palette.secondary.color};

  a {
    box-shadow: none;
  }
`

const Description = styled.p`
  margin: 0;
`

const Published = styled.small`
  color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.5 })};
`

interface BlogIndexProps {
  data: PageData
}

const BlogIndex: FunctionComponent<BlogIndexProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Post key={node.fields.slug}>
            <Title>
              <Link to={node.fields.slug}>{title}</Link>
            </Title>
            <Description>{node.frontmatter.description || node.excerpt}</Description>
            <Published>
              <time dateTime={node.frontmatter.created}>{node.frontmatter.created}</time>
            </Published>
          </Post>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___created], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            created(formatString: "DD MMMM YYYY")
            title
            description
          }
        }
      }
    }
  }
`
