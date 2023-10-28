import { FunctionComponent } from 'react'

const EducationContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

const Institution = styled.b`
  opacity: 0.9;
`

const Course = styled.div`
  opacity: 0.7;
  margin-right: ${({ theme }) => theme.spacing(1 / 2)};
`

const Glyph = styled.span`
  color: ${({ theme }) => theme.palette.primary.color};
  margin-right: ${({ theme }) => theme.spacing(1 / 2)};
`

const Year = styled.small`
  opacity: 0.5;
`

interface EducationProps {
  institution: string
  start: number
  end: number
  course: string
}

export const Education: FunctionComponent<EducationProps> = ({ institution, start, end, course }) => {
  return (
    <>
      <EducationContainer>
        <div>
          <Glyph>▷</Glyph>
          <Institution>{institution}</Institution>
        </div>
        <Course>{course}</Course>
        <Year>{`${start} - ${end}`}</Year>
      </EducationContainer>
    </>
  )
}
