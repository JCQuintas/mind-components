import React, { ReactNode } from 'react'
import styled from 'styled-components'

const StyledRoot = styled.div`
  height: 100%;
`

interface Props {
  children: ReactNode
}

export const Base = (props: Props) => <StyledRoot>{props.children}</StyledRoot>
