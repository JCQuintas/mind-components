// import React, { FunctionComponent } from 'react'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { GlobalStylesComponent } from '../utils/global-style'
import { ThemeProvider } from '../utils/theme-provider'

const StyledRoot = styled.div`
  height: 100%;
`

export const Base: FunctionComponent = (props) => {
  return (
    <ThemeProvider>
      <StyledRoot>
        <GlobalStylesComponent />
        {props.children}
      </StyledRoot>
    </ThemeProvider>
  )
}
