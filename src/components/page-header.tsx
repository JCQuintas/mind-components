import Link from 'next/link'
import { FunctionComponent } from 'react'
import './page-header.css'

export type PageHeaderProps = {
  isRoot?: boolean
}

export const PageHeader: FunctionComponent<PageHeaderProps> = ({ isRoot }) => {
  const title = 'MindComponents'
  const author = 'Jose Quintas'

  const Heading = isRoot ? 'h1' : 'h3'

  return (
    <header>
      <Heading className="heading">
        <Link className="link" href={`/`}>
          <small className="author">{`${author}'s `}</small>
          <br />
          {title}
        </Link>
      </Heading>
    </header>
  )
}
