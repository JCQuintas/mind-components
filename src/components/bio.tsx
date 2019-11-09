import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GImage from 'gatsby-image'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};
`

const Image = styled(GImage)`
  margin-right: ${({ theme }) => theme.spacing(0.5)};
  margin-bottom: 0;
  min-width: ${({ theme }) => theme.spacing(2)};
  min-height: ${({ theme }) => theme.spacing(2)};
  border-radius: 100%;
`

export const Bio: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile.png/" }) {
        childImageSharp {
          fixed(width: 56, height: 56) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            facebook
            github
            linkedin
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata as SiteMetadata
  return (
    <Container>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>
        <div>Hi there, this is my personal website and blog.</div>
        <div>
          You can find me on{' '}
          <a href={`https://github.com/${social.github}`} target="_blank">
            Github
          </a>{' '}
          and{' '}
          <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank">
            LinkedIn
          </a>
        </div>
      </div>
    </Container>
  )
}
