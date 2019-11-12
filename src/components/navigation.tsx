import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

const NavigationContainer = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  padding-top: ${({ theme }) => theme.spacing(0.2)};
  border-top: 1px solid ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.2 })};
  transition: ${({ theme }) => theme.transition('border-top')};
`

const List = styled.ul`
  margin: 0;
  display: flex;
`

const ListItem = styled.li`
  list-style: none;
  margin: 0;

  &:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing(1)};
  }
`

const Link = styled(GatsbyLink).attrs(() => ({ activeClassName: 'active' }))`
  color: ${({ theme }) => theme.palette.foreground.color};

  box-shadow: none;
  font-weight: 600;
  ${({ theme }) => theme.scale(-0.1)};

  &.active {
    color: ${({ theme }) => theme.palette.primary.color};
  }
`

export const Navigation: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <List>
        <ListItem>
          <Link to="/">Blog</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">About</Link>
        </ListItem>
      </List>
    </NavigationContainer>
  )
}
