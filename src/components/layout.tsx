import React, { FunctionComponent } from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { Location } from '@reach/router'
import { Navigation } from './navigation'

const heading = css`
  margin-bottom: 0;
  margin-top: 0;

  a:hover {
    color: inherit;
  }
`

const H1 = styled.h1`
  ${({ theme }) => theme.scale(1)}
  color: ${({ theme }) => theme.palette.primary.color};

  ${heading}
`

const H3 = styled.h3`
  height: ${({ theme }) => theme.spacing(1.5)};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.secondary.color};
  ${heading}
`

const LayoutRoot = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ theme }) => theme.spacing(24)};
  padding: ${({ theme }) => theme.spacing(1.5, 3 / 4)};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1 / 2)};
`

const Link = styled(GatsbyLink)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

const Author = styled.small`
  color: ${({ theme }) => theme.palette.foreground.color};
  opacity: 0.5;
`

interface QueryData {
  site: {
    siteMetadata: Pick<SiteMetadata, 'title' | 'author'>
  }
}

export const Layout: FunctionComponent = ({ children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const {
    site: {
      siteMetadata: { title, author },
    },
  }: QueryData = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <LayoutRoot>
      <Header>
        <Location>
          {({ location: { pathname } }) => {
            const Heading = pathname === rootPath ? H1 : H3
            return (
              <Heading>
                <Link to={`/`}>
                  <Author>{`${author}'s `}</Author>
                  <br />
                  {title}
                </Link>
              </Heading>
            )
          }}
        </Location>
      </Header>
      <Navigation />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </LayoutRoot>
  )
}
