import { createGlobalStyle, withTheme } from 'styled-components'
import { createElement } from 'react'
import { prismCss } from './theme-style'

const GlobalStyle = createGlobalStyle<Styled>`
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
  }

  a.anchor {
    fill: ${({ theme }: Styled) => theme.palette.foreground.color};

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
    color: ${({ theme }: Styled) => theme.palette.secondary.color};
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

  ${prismCss}
`

export const GlobalStylesComponent = withTheme(({ theme }: Styled) => createElement(GlobalStyle, { theme }))
