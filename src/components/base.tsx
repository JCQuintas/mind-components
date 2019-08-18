// import React, { FunctionComponent } from 'react'
import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThemeModeProvider } from '../utils/theme'
import { GlobalStylesComponent } from '../utils/global-style'

const StyledRoot = styled.div`
  height: 100%;
`

export const Base: FunctionComponent = props => {
  const [render, setRender] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setRender(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <ThemeModeProvider>
      <StyledRoot>
        <GlobalStylesComponent />
        {render && props.children}
      </StyledRoot>
    </ThemeModeProvider>
  )
}
