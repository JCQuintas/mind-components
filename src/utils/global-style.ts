import { createGlobalStyle, withTheme } from 'styled-components'
import { createElement } from 'react'
import { codeStyle } from './code-style'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    background-color: ${({ theme }: Styled) => theme.palette.background.color};
    color: ${({ theme }: Styled) => theme.palette.foreground.color};
    transition: ${({ theme }: Styled) => theme.transition(['color', 'background-color'])};
    font-weight: ${({ theme }: Styled) => (theme.isDark ? 400 : 500)};
  }

  a {
    color: ${({ theme }: Styled) => theme.palette.secondary.color};
    transition: ${({ theme }: Styled) => theme.transition('color')};
    text-decoration: none;
    box-shadow: 0 1px 0 0 currentColor;

    &:hover {
      box-shadow: none;
    }
  }

  a.anchor {
    fill: ${({ theme }: Styled) => theme.palette.foreground.color};
    box-shadow: none;

    &:hover {
      fill: ${({ theme }: Styled) => theme.palette.primary.color};
    }
  }

  a:hover {
    color: ${({ theme }: Styled) => theme.palette.secondary.color};
  }

  h1 {
    color: ${({ theme }: Styled) => theme.palette.primary.color};
  }

  h2, h3, h4, h5 {
    color: ${({ theme }: Styled) => theme.palette.foreground.color};
    margin-top: ${({ theme }: Styled) => theme.typography.rhythm(2)};
  }

  h1, h2, h3, h4, h5 {
    transition: ${({ theme }: Styled) => theme.transition('color')};

    a {
      color: inherit;
      transition: none;

      &:hover {
        color: inherit;
      }
    }
  }

  hr {
    background-color: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.1)};
  }

  th, td {
    border-color: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.1)};
  }

  strong {
    font-weight: 700;
  }

  blockquote {
    padding:${({ theme }: Styled) => theme.typography.rhythm(1 / 2, 1)};
    border-radius: ${({ theme }: Styled) => theme.typography.rhythm(1 / 2)};
    margin-left:${({ theme }: Styled) => theme.typography.rhythm(1)};
    margin-right: ${({ theme }: Styled) => theme.typography.rhythm(1)};
    background: ${({ theme }: Styled) => theme.palette.foreground.opacity(0.1)};
    border-left: 2px solid ${({ theme }: Styled) => theme.palette.primary.color};
    border-right: 2px solid ${({ theme }: Styled) => theme.palette.primary.color};
  }

  ${codeStyle}
`

export const GlobalStylesComponent = withTheme(({ theme }: Styled) => createElement(GlobalStyle, { theme }))
