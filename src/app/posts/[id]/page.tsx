import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Bio } from '../../../components/bio'
import { Icon } from '../../../components/icon/icon'
import { Navigation } from '../../../components/navigation'
import { PageHeader } from '../../../components/page-header'
import { dateTimeFormat } from '../../../date-time-format'
import { getPostData } from '../get-posts'
import codeStyles from './code.module.scss'
import { SeriesInfo } from './components/series-info'
import styles from './post.module.css'

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

  const formattedCreated = dateTimeFormat.format(post.created)
  const formattedEdited = dateTimeFormat.format(post.edited)

  const nextPostInSeries = post.series && post.part && post.postsInSeries.find((p) => p.part === (post.part ?? -1) + 1)

  return (
    <>
      <PageHeader />
      <Navigation />
      <main className={styles.posts}>
        <h1 className={styles.title}>{post.title}</h1>
        <div>
          <p className={styles.published}>
            <time dateTime={formattedCreated}>{formattedCreated}</time>
          </p>
          {formattedCreated !== formattedEdited && (
            <p className={styles.published}>
              <time dateTime={formattedEdited}>{formattedEdited}</time> (updated)
            </p>
          )}
        </div>
        {post.series && post.part && (
          <SeriesInfo series={post.series} part={post.part} postsInSeries={post.postsInSeries} />
        )}
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  style={codeTheme}
                  useInlineStyles={false}
                  language={match[1]}
                  className={codeStyles.codeHighlight}
                  wrapLines={true}
                  codeTagProps={{ style: {}, className }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {post.markdownContent}
        </Markdown>
        {nextPostInSeries && (
          <aside className={styles.nextPart}>
            Continue reading this series on <a href={nextPostInSeries.slug}>Part {nextPostInSeries.part}</a>.
          </aside>
        )}
        <hr className={styles.divider} />
        <Bio />
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
