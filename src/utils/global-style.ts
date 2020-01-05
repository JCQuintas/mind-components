import { createGlobalStyle, withTheme } from 'styled-components'
import { createElement } from 'react'
import { vscodeStyle } from './vscode-style'

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: auto;
  }


  html,
  body {
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.palette.background.color};
    color: ${({ theme }) => theme.palette.foreground.color};
    transition: ${({ theme }) => theme.transition(['background-color'])};
    font-weight: ${({ theme }) => (theme.isDark ? 400 : 500)};
    ${({ theme }) => theme.isDark && { letterSpacing: '0.006em' }};
    margin-left: calc(100vw - 100%);
  }

  a {
    color: ${({ theme }) => theme.palette.secondary.color};
    transition: ${({ theme }) => theme.transition(['color', 'box-shadow'])};
    text-decoration: none;
    box-shadow: 0 1px 0 0 currentColor;

    &:hover {
      box-shadow: none;
      color: ${({ theme }) => theme.palette.secondary.color};
    }

    &.anchor {
      fill: ${({ theme }) => theme.palette.foreground.color};
      box-shadow: none;

      &:hover {
        fill: ${({ theme }) => theme.palette.primary.color};
      }
    }
  }

  h1 {
    color: ${({ theme }) => theme.palette.primary.color};
  }

  h2,
  h3,
  h4,
  h5 {
    color: ${({ theme }) => theme.palette.foreground.color};
    margin-top: ${({ theme }) => theme.spacing(2)};
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    transition: ${({ theme }) => theme.transition('color')};
    ${({ theme }) => theme.isDark && { letterSpacing: 'normal' }};

    a {
      color: inherit;
      transition: none;
      ${({ theme }) => theme.isDark && { letterSpacing: 'normal' }};

      &:hover {
        color: inherit;
      }
    }
  }

  abbr[title] {
    border-bottom: 1px dotted ${({ theme }) => theme.palette.foreground.color};
  }

  small, p, code, aside, footer  {
    transition: ${({ theme }) => theme.transition(['color', 'border-color'])};
  }

  hr {
    background-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.1 })};
  }

  th,
  td {
    border-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.1 })};
  }

  strong {
    font-weight: 700;
  }

  blockquote {
    position: relative;
    padding: ${({ theme }) => theme.spacing(1 / 2, 1)};
    border-bottom-left-radius: ${({ theme }) => theme.spacing(1 / 2)};
    border-bottom-right-radius: ${({ theme }) => theme.spacing(1 / 2)};
    margin-left: ${({ theme }) => theme.spacing(1)};
    margin-right: ${({ theme }) => theme.spacing(1)};
    background: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.1 })};
    border-left: 2px solid;
    border-right: 2px solid;
    line-height: ${({ theme }) => theme.spacing(1.1)};
      letter-spacing: ${({ theme }) => theme.spacing(0.01)};
    border-image: linear-gradient(
        to bottom,
        ${({ theme }) => theme.palette.primary.color} 0%,
        ${({ theme }) => theme.palette.primary.manipulate({ opacity: 0 })} 70%
      )
      1 100%;
    ${({ theme }) => theme.scale(0.3)};

    ${({ theme }) => theme.breakpoint.up.sm}{    &.right,
    &.left {
      max-width: ${({ theme }) => theme.spacing(10)};
    }

    &.right {
      float: right;
    }

    &.left {
      float: left;
    }}

    cite {
      ${({ theme }) => theme.scale(0)};
      position: absolute;
      color: ${({ theme }) => theme.palette.primary.color};
      bottom: -1em;
      right: ${({ theme }) => theme.spacing(1)};

      &:before {
        content: '-';
        position: absolute;
        left: -0.5em;
      }
    }
  }

  aside {
    background: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.1 })};
    padding: ${({ theme }) => theme.spacing(1 / 2, 1 / 2)};
    border-radius: ${({ theme }) => theme.spacing(1 / 2)};
    margin-bottom: ${({ theme }) => theme.spacing(1)};

    & p:last-child {
      margin-bottom: 0;
    }
  }

  ${vscodeStyle}
`

export const GlobalStylesComponent = withTheme(({ theme }) => createElement(GlobalStyle, { theme }))
