import { readFile, readdir } from 'fs/promises'
import path from 'path'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'
import { matter } from 'vfile-matter'

export type PostData = {
  id: string
  slug: string
  title: string
  created: string
  description: string
  keywords: string
  edited?: string
  series?: string
  part?: string
  markdownContent: string
  next?: Pick<PostData, 'slug' | 'title'>
  previous?: Pick<PostData, 'slug' | 'title'>
  postsInSeries: Pick<PostData, 'slug' | 'title' | 'part'>[]
}

type PostMetadata = Pick<PostData, 'title' | 'created' | 'description' | 'keywords' | 'edited' | 'series' | 'part'>

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

const createSlug = (id: string): string => `/posts/${id}`

export const getSortedPostsData = async (): Promise<PostData[]> => {
  const fileNames = await readdir(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames.map(async (dirname) => {
      const id = dirname

      const fullPath = path.join(postsDirectory, `${id}/index.md`)
      const fileContents = await readFile(fullPath, 'utf8')

      const file = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .use(() => (_, file) => matter(file))
        .use(() => (tree, file) => {
          visit(tree, 'image', (node) => {
            const image = node as { url?: string }

            const isLocal = image.url?.startsWith('/') || image.url?.startsWith('./')

            if (isLocal) {
              image.url = path.join('/posts', id, image.url as string)
            }
          })
        })
        .use(() => (tree) => remove(tree, null, ['yaml', 'toml']))
        .use(remarkStringify)
        .process(fileContents)

      const metadata = file.data.matter as PostMetadata

      return {
        id,
        slug: createSlug(id),
        ...metadata,
        markdownContent: file.value.toString(),
      }
    })
  )

  return allPostsData
    .sort((a, b) => {
      if (a.created < b.created) {
        return 1
      } else {
        return -1
      }
    })
    .map((post, index, array) => {
      const next = array[index - 1]
      const previous = array[index + 1]
      const postsInSeries = array
        .filter((related) => related.series === post.series)
        .sort((a, b) => {
          if (!a.part || !b.part) return 0
          if (a.part > b.part) return 1
          return -1
        })
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          part: post.part,
        }))

      return {
        ...post,
        next: next ? { slug: next.slug, title: next.title } : undefined,
        previous: previous ? { slug: previous.slug, title: previous.title } : undefined,
        postsInSeries,
      }
    })
}

export const getPostData = async (id: string): Promise<PostData | undefined> => {
  const postsData = await getSortedPostsData()
  const post = postsData.find((post) => post.id === id)
  return post
}
