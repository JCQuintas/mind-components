import React, { FunctionComponent } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled, { css } from 'styled-components'
import { ThemeToggle } from './theme-toggle'

const heading = css`
  margin-bottom: 0;
  margin-top: 0;

  a:hover {
    color: inherit;
  }
`

const H1 = styled.h1`
  ${({ theme }: Styled) => theme.typography.scale(1)}
  color: ${({ theme }: Styled) => theme.palette.primary.color};

  ${heading}
`

const H3 = styled.h3`
  color: ${({ theme }: Styled) => theme.palette.secondary.color};
  ${heading}
`

const LayoutRoot = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ theme }: Styled) => theme.typography.rhythm(24)};
  padding: ${({ theme }: Styled) => theme.typography.rhythm(1.5, 3 / 4)};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }: Styled) => theme.typography.rhythm(1.5)};
`

const Link = styled(GatsbyLink)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

export const Layout: FunctionComponent<{ location: Location; title: string }> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <H1>
        <Link to={`/`}>{title}</Link>
      </H1>
    )
  } else {
    header = (
      <H3>
        <Link to={`/`}>{title}</Link>
      </H3>
    )
  }
  return (
    <LayoutRoot>
      <Header>
        {header}
        <ThemeToggle />
      </Header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </LayoutRoot>
  )
}
