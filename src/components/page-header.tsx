import Link from 'next/link'
import { FunctionComponent } from 'react'
import { siteData } from '../site-data'
import styles from './page-header.module.css'

export type PageHeaderProps = {
  isRoot?: boolean
}

export const PageHeader: FunctionComponent<PageHeaderProps> = ({ isRoot }) => {
  const Heading = isRoot ? 'h1' : 'h3'

  return (
    <header className={styles.header}>
      <Heading className={styles.heading}>
        <Link className={styles.link} href={`/`}>
          <small className={styles.author}>{`${siteData.author}'s `}</small>
          <br />
          {siteData.title}
        </Link>
      </Heading>
    </header>
  )
}
