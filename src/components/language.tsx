import { FunctionComponent } from 'react'

const LanguageContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1 / 2)};
`

const Name = styled.b`
  opacity: 0.9;
`

const Glyph = styled.span`
  color: ${({ theme }) => theme.palette.primary.color};
  margin-right: ${({ theme }) => theme.spacing(1 / 2)};
`

const Level = styled.span`
  text-transform: capitalize;
`

interface LanguageProps {
  name: string
  level: 'native' | 'fluent' | 'conversational'
}

export const Language: FunctionComponent<LanguageProps> = ({ name, level }) => {
  return (
    <>
      <LanguageContainer>
        <Glyph>◇</Glyph>
        <Name>{name}</Name> - <Level>{level}</Level>
      </LanguageContainer>
    </>
  )
}
