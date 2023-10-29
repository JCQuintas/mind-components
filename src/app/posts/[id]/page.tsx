import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import { Icon } from '../../../components/icon/icon'
import { Navigation } from '../../../components/navigation'
import { PageHeader } from '../../../components/page-header'
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
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
  }
}

export default async function Post({ params }: Props) {
  const post = await getPostData(params.id)

  if (!post) {
    return notFound()
  }

  // const isPartOfSeries = post.metadata.series && post.metadata.part

  return (
    <>
      <PageHeader />
      <Navigation activePath="/posts" />
      <main className={styles.posts}>
        <h1 className={styles.title}>{post.metadata.title}</h1>
        <p className={styles.published}>
          <time dateTime={post.metadata.created}>{post.metadata.created}</time>
        </p>
        {post.metadata.created !== post.metadata.edited && (
          <p className={styles.published}>
            <time dateTime={post.metadata.edited}>{post.metadata.edited}</time> (updated)
          </p>
        )}
        {/* {isPartOfSeries && (
        <SeriesInfo
          series={post.metadata.series!}
          part={post.metadata.part!}
          posts={data.allMarkdownRemark.edges
            .filter((v) => v.node.frontmatter.series === post.metadata.series)
            .map((v) => v.node.fields.slug)}
        />
      )} */}
        <Markdown>{post.markdownContent}</Markdown>
        <hr className={styles.divider} />
        {/* <Bio /> */}
        <ul className={styles.pagination}>
          <li>
            {post.previous && (
              <Link href={`/posts/${post.previous.id}`}>
                <Icon.Back />
                <span>{post.previous.title}</span>
              </Link>
            )}
          </li>
          <li>
            {post.next && (
              <Link href={`/posts/${post.next.id}`}>
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
