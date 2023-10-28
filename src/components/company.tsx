import { FunctionComponent, ReactNode } from 'react'
import './company.css'

interface CompanyProps {
  position: string
  company: string
  period: string
  website: string
  children: ReactNode
}

export const Company: FunctionComponent<CompanyProps> = ({ position, company, period, website, children }) => {
  return (
    <>
      <div className="company">
        <div className="position">{position}</div>
        <a href={website} className="small place" target="_blank" rel="noopener noreferrer">
          {company}
        </a>
        <div className="time-period small">{period}</div>
      </div>
      <p className="description">{children}</p>
    </>
  )
}
