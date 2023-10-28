import Link from 'next/link'
import { FunctionComponent } from 'react'
import { siteData } from '../site-data'
import './page-header.css'

export type PageHeaderProps = {
  isRoot?: boolean
}

export const PageHeader: FunctionComponent<PageHeaderProps> = ({ isRoot }) => {
  const Heading = isRoot ? 'h1' : 'h3'

  return (
    <header>
      <Heading className="heading">
        <Link className="link" href={`/`}>
          <small className="author">{`${siteData.author}'s `}</small>
          <br />
          {siteData.title}
        </Link>
      </Heading>
    </header>
  )
}
