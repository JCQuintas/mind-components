import React, { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'

const CompanyContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(1 / 2)};
  transition: ${({ theme }) => theme.transition(['border-left', 'background-color'])};
  border-left: 3px solid ${({ theme }) => theme.palette.primary.color};
  background-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.05 })};
  position: relative;

  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: auto auto auto;

  row-gap: ${({ theme }) => theme.spacing(1 / 5)};

  ${({ theme }) => theme.breakpoint.up.sm} {
    margin-left: ${({ theme }) => theme.spacing(-1 / 2)};
    margin-right: ${({ theme }) => theme.spacing(-1 / 2)};
    grid-template-columns: max-content max-content;
    grid-template-rows: auto auto;
  }
`

const Position = styled.div`
  font-weight: 600;
  opacity: 0.9;

  grid-column: 1 / -1;
`

const small = css`
  font-size: ${({ theme }) => theme.scale(-0.3).fontSize};
  opacity: 0.7;
`

const Place = styled.a.attrs(() => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  ${small}

  justify-self: start;

  color: ${({ theme }) => theme.palette.foreground.color};

  &:hover {
    color: ${({ theme }) => theme.palette.foreground.color};
  }
`

const TimePeriod = styled.div`
  ${small}

  ${({ theme }) => theme.breakpoint.up.sm} {
    margin-left: ${({ theme }) => theme.spacing(1 / 2)};
    padding-left: ${({ theme }) => theme.spacing(1 / 2)};
    border-left: 1px solid ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.2 })};
  }
`

const Description = styled.p`
  padding: ${({ theme }) => theme.spacing(1 / 2, 0, 1 / 2, 1 / 2)};
  border-left: 3px solid ${({ theme }) => theme.palette.primary.color};
  transition: ${({ theme }) => theme.transition(['border-left', 'background-color'])};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoint.up.sm} {
    margin-left: ${({ theme }) => theme.spacing(-1 / 2)};
  }
`

interface CompanyProps {
  position: string
  company: string
  period: string
  website: string
}

export const Company: FunctionComponent<CompanyProps> = ({ position, company, period, website, children }) => {
  return (
    <>
      <CompanyContainer>
        <Position>{position}</Position>
        <Place href={website}>{company}</Place>
        <TimePeriod>{period}</TimePeriod>
      </CompanyContainer>
      <Description>{children}</Description>
    </>
  )
}
