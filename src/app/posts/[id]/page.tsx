import { Metadata } from 'next'
import Markdown from 'react-markdown'
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
  const { metadata } = await getPostData(params.id)

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  }
}

export default async function Post({ params }: Props) {
  const { metadata, markdownContent } = await getPostData(params.id)

  return (
    <>
      <PageHeader />
      <Navigation activePath="/posts" />
      <main className={styles.posts}>
        <h1 className={styles.title}>{metadata.title}</h1>
        <p className={styles.published}>
          <time dateTime={metadata.created}>{metadata.created}</time>
        </p>
        {metadata.created !== metadata.edited && (
          <p className={styles.published}>
            <time dateTime={metadata.edited}>{metadata.edited}</time> (updated)
          </p>
        )}
        {/* {isPartOfSeries && (
        <SeriesInfo
          series={metadata.series!}
          part={metadata.part!}
          posts={data.allMarkdownRemark.edges
            .filter((v) => v.node.frontmatter.series === metadata.series)
            .map((v) => v.node.fields.slug)}
        />
      )} */}
        <Markdown>{markdownContent}</Markdown>
        <hr className={styles.divider} />
        {/* <Bio /> */}
        <ul className={styles.pagination}>
          {/* <li>
          {previous && (
            <Link href={previous.fields.slug}>
              <Icon.Back />
              <span>{previous.frontmatter.title}</span>
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link href={next.fields.slug}>
              <span>{next.frontmatter.title}</span>
              <Icon.Forward />
            </Link>
          )}
        </li> */}
        </ul>
      </main>
    </>
  )
}
