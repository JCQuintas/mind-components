import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Icon } from './icon'

const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ theme }) => theme.spacing(3)}, 1fr));
  gap: ${({ theme }) => theme.spacing(2 / 3)};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;

  ${({ theme }) => theme.breakpoint.up.sm} {
    grid-template-columns: repeat(auto-fill, minmax(${({ theme }) => theme.spacing(4)}, 1fr));
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

const Skill = styled.li`
  display: grid;
  grid-template-rows: 1fr min-content;
  justify-items: center;
  align-items: center;
  margin: 0;
  opacity: 0.7;
  transition: ${({ theme }) => theme.transition('opacity')};

  &:hover {
    opacity: 1;
  }

  svg {
    height: ${({ theme }) => theme.spacing(2)};
    width: ${({ theme }) => theme.spacing(2)};
  }
`

export const Skills: FunctionComponent = () => {
  return (
    <SkillsContainer>
      <Skill>
        <Icon.Typescript />
        Typescript
      </Skill>
      <Skill>
        <Icon.ReactJs />
        React
      </Skill>
      <Skill>
        <Icon.NodeJs />
        NodeJS
      </Skill>
      <Skill>
        <Icon.Figma />
        Figma
      </Skill>
      <Skill>
        <Icon.Jest />
        Jest
      </Skill>
      <Skill>
        <Icon.MobX />
        MobX
      </Skill>
      <Skill>
        <Icon.FramerMotion />
        Framer Motion
      </Skill>
      <Skill>
        <Icon.Html5 />
        HTML 5
      </Skill>
      <Skill>
        <Icon.Css3 />
        CSS 3
      </Skill>
      <Skill>
        <Icon.Gcp />
        GCP
      </Skill>
      <Skill>
        <Icon.Aws />
        AWS
      </Skill>
      <Skill>
        <Icon.Git />
        Git
      </Skill>
    </SkillsContainer>
  )
}
