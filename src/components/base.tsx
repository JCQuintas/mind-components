import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ThemeModeProvider } from '../utils/theme'
import { GlobalStylesComponent } from '../utils/global-style'

const StyledRoot = styled.div`
  height: 100%;
`

export const Base: FunctionComponent = props => (
  <ThemeModeProvider>
    <StyledRoot>
      <GlobalStylesComponent />
      {props.children}
    </StyledRoot>
  </ThemeModeProvider>
)
