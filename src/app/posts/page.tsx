import { Metadata } from 'next'
import Link from 'next/link'
import { Bio } from '../../components/bio'
import { Navigation } from '../../components/navigation'
import { PageHeader } from '../../components/page-header'
import { dateTimeFormat } from '../../date-time-format'
import { fillMetadata } from '../../fill-metadata'
import { siteData } from '../../site-data'
import { getSortedPostsData } from './get-posts'
import styles from './posts.module.scss'

export const metadata: Metadata = fillMetadata({
  title: `Posts | ${siteData.title}`,
  description: `A list of all posts by ${siteData.author}.`,
})

export default async function Home() {
  const posts = await getSortedPostsData()

  return (
    <>
      <PageHeader />
      <Navigation activePath="/posts" />
      <main className={styles.posts}>
        <Bio />
        {posts.map((post) => {
          const title = post.title
          const created = dateTimeFormat.format(post.created)

          return (
            <div className={styles.post} key={post.slug}>
              <h3 className={styles.title}>
                <Link href={post.slug}>{title}</Link>
              </h3>
              <p className={styles.description}>{post.description}</p>
              <small className={styles.published}>
                <time dateTime={created}>{created}</time>
              </small>
            </div>
          )
        })}
      </main>
    </>
  )
}
