import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GImage from 'gatsby-image'

import styled from 'styled-components'
import { Icon } from './icon'

const Container = styled.div`
  display: flex;
  margin-bottom: ${({ theme }: Styled) => theme.typography.rhythm(2.5)};
`

const Image = styled(GImage)`
  margin-right: ${({ theme }: Styled) => theme.typography.rhythm(0.5)};
  margin-bottom: 0;
  min-width: ${({ theme }: Styled) => theme.typography.rhythm(2)};
  min-height: ${({ theme }: Styled) => theme.typography.rhythm(2)};
  border-radius: 100%;
`

const Subtitle = styled.div`
  line-height: 1.1em;
`

const Location = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }: Styled) => theme.palette.primary.color};
  ${({ theme }: Styled) => theme.typography.scale(-0.2)};
`

const LocationIcon = styled(Icon.Location)`
  margin-right: ${({ theme }: Styled) => theme.typography.rhythm(0.1)};
`

export const Bio: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
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
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
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
        <div>
          <a href={`https://github.com/${social.github}`}>
            <strong>{author}</strong>
          </a>
          ' personal blog
        </div>
        <Subtitle>This is where I tinker with new ideas</Subtitle>
        <Location>
          <LocationIcon />
          Amsterdam
        </Location>
      </div>
    </Container>
  )
}
