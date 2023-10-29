import clsx from 'clsx'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { PostData } from '../../get-posts'
import styles from './series-info.module.css'

interface SeriesInfoProps {
  series: string
  part: number
  postsInSeries: PostData['postsInSeries']
}

export const SeriesInfo: FunctionComponent<SeriesInfoProps> = ({ series, part, postsInSeries }) => {
  if (postsInSeries.length === 1) return null
  return (
    <div className={styles.seriesInfo}>
      <p>
        This post is <b>{part}</b> of <b>{postsInSeries.length}</b> on the series <b>{series}</b>. You can find the
        links to all the posts in this series below.
      </p>
      <ul>
        {postsInSeries.map((post, i) => (
          <li key={post.slug}>
            <span className={styles.glyph}>◗</span>
            <Link href={post.slug} className={clsx({ active: post.part === part })}>
              Part {post.part}
              {post.part === part && ' - current'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
