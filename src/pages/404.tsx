import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'

interface NotFoundProps {
  data: Pick<PageData, 'site'>
}

const NotFoundPage: FunctionComponent<NotFoundProps> = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
