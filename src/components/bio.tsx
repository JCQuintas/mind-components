import React, { FunctionComponent, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import GImage from 'gatsby-image'

import styled from 'styled-components'
import { Icon } from './icon'
import { DarkModeContext } from '../utils/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }: Styled) => theme.typography.rhythm(2.5)};
`
const PictureAndText = styled.div`
  display: flex;
`

const Image = styled(GImage)`
  margin-right: ${({ theme }: Styled) => theme.typography.rhythm(0.5)};
  margin-bottom: 0;
  min-width: 50px;
  border-radius: 100%;
`

const Subtitle = styled.div`
  line-height: 1.1em;
  opacity: 0.7;
`

const Location = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.7;
  color: ${({ theme }: Styled) => theme.palette.primary.color};
`

const LocationIcon = styled(Icon.Location)`
  height: 1.2rem;
  width: 1.2rem;
  margin-right: 0.1em;
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

  const { setIsDarkMode } = useContext(DarkModeContext)

  const { author, social } = data.site.siteMetadata
  return (
    <Container>
      <PictureAndText>
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <div>
          <div>
            <a href={`httdiv://github.com/${social.github}`}>
              <strong>{author}</strong>
            </a>
            ' personal blog
          </div>
          <Subtitle
            onClick={() => {
              setIsDarkMode(e => !e)
            }}
          >
            This is where I tinker with new ideas
          </Subtitle>
        </div>
      </PictureAndText>
      <Location>
        <LocationIcon />
        Amsterdam
      </Location>
    </Container>
  )
}
