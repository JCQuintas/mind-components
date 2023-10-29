import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Icon } from '../../../components/icon/icon'
import { Navigation } from '../../../components/navigation'
import { PageHeader } from '../../../components/page-header'
import { SeriesInfo } from './components/series-info'
import { getPostData } from './get-posts'
import styles from './posts.module.css'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.id)

  if (!post) {
    return notFound()
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
  }
}

export default async function Post({ params }: Props) {
  const post = await getPostData(params.id)

  if (!post) {
    return notFound()
  }

  return (
    <>
      <PageHeader />
      <Navigation activePath="/posts" />
      <main className={styles.posts}>
        <h1 className={styles.title}>{post.title}</h1>
        <div>
          <p className={styles.published}>
            <time dateTime={post.created}>{post.created}</time>
          </p>
          {post.created !== post.edited && (
            <p className={styles.published}>
              <time dateTime={post.edited}>{post.edited}</time> (updated)
            </p>
          )}
        </div>
        {post.series && post.part && (
          <SeriesInfo series={post.series} part={post.part} postsInSeries={post.postsInSeries} />
        )}
        <Markdown rehypePlugins={[rehypeRaw]}>{post.markdownContent}</Markdown>
        <hr className={styles.divider} />
        {/* <Bio /> */}
        <ul className={styles.pagination}>
          <li>
            {post.previous && (
              <Link href={post.previous.slug}>
                <Icon.Back />
                <span>{post.previous.title}</span>
              </Link>
            )}
          </li>
          <li>
            {post.next && (
              <Link href={post.next.slug}>
                <span>{post.next.title}</span>
                <Icon.Forward />
              </Link>
            )}
          </li>
        </ul>
      </main>
    </>
  )
}
