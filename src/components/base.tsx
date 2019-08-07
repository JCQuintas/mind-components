import React, { ReactNode } from 'react'
import { GlobalStyle } from '../utils/theme'
import styled, { withTheme } from 'styled-components'

const GlobalStylesComponent = withTheme(({ theme }: Styled) => <GlobalStyle theme={theme} />)

const StyledRoot = styled.div`
  height: 100%;
`

interface Props {
  children: ReactNode
}

export const Base = (props: Props) => (
  <StyledRoot>
    <GlobalStylesComponent />
    {props.children}
  </StyledRoot>
)
