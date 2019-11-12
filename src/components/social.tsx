import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { Icon } from './icon'

const SocialContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
  border-left: 3px solid ${({ theme }) => theme.palette.primary.color};
  background-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.05 })};

  ${({ theme }) => theme.breakpoint.up.sm} {
    margin-left: ${({ theme }) => theme.spacing(-1 / 2)};
    margin-right: ${({ theme }) => theme.spacing(-1 / 2)};
  }
`

const Platforms = styled.div`
  display: grid;
  grid-template: repeat(3, 1fr) / min-content;
  gap: ${({ theme }) => theme.spacing(1 / 4)};
  padding: ${({ theme }) => theme.spacing(1 / 2)};
`

const Location = styled.div`
  background-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.1 })};
  padding: ${({ theme }) => theme.spacing(1 / 2)};
  display: flex;
  justify-content: flex-start;
`

const Link = styled.a.attrs(
  ({ target }) =>
    target === '_blank' && {
      rel: 'noopener noreferrer',
    }
)`
  opacity: 0.6;
  display: grid;
  grid-template: 1fr / min-content min-content;
  gap: ${({ theme }) => theme.spacing(1 / 3)};
  align-items: center;
  color: ${({ theme }) => theme.palette.foreground.color};
  box-shadow: none;
  justify-content: flex-start;

  &:hover {
    color: ${({ theme }) => theme.palette.foreground.color};
    opacity: 1;
  }
`

export const Social: FunctionComponent = () => {
  const data = useStaticQuery<Query>(query)

  const { github, email, linkedin } = data.site.siteMetadata.social

  return (
    <SocialContainer>
      <Location>
        <Link href={`https://www.google.com.br/maps?q=amsterdam`} target="_blank">
          <Icon.Location />
          {`Amsterdam`}
        </Link>
      </Location>
      <Platforms>
        <Link href={`mailto:${email}`}>
          <Icon.Email />
          {email}
        </Link>
        <Link href={`https://github.com/${github}`} target="_blank">
          <Icon.Github />
          {github}
        </Link>
        <Link href={`https://linkedin.com/in/${linkedin}`} target="_blank">
          <Icon.Linkedin />
          {linkedin}
        </Link>
      </Platforms>
    </SocialContainer>
  )
}

interface Query {
  site: {
    siteMetadata: SiteMetadata
  }
}

const query = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          github
          linkedin
          email
        }
      }
    }
  }
`
