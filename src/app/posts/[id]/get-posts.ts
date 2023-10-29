import { readFile, readdir } from 'fs/promises'
import path from 'path'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'
import { matter } from 'vfile-matter'

type PostData = {
  id: string
  metadata: {
    title: string
    created: string
    description: string
    keywords: string
    edited?: string
    series?: string
    part?: string
  }
  markdownContent: string
  next?: {
    id: string
    title: string
  }
  previous?: {
    id: string
    title: string
  }
}

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

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

      return {
        id,
        metadata: file.data.matter as PostData['metadata'],
        markdownContent: file.value.toString(),
      }
    })
  )

  return allPostsData
    .sort((a, b) => {
      if (a.metadata.created < b.metadata.created) {
        return 1
      } else {
        return -1
      }
    })
    .map((post, index, array) => {
      const next = array[index - 1]
      const previous = array[index + 1]

      return {
        ...post,
        next: next ? { id: next.id, title: next.metadata.title } : undefined,
        previous: previous ? { id: previous.id, title: previous.metadata.title } : undefined,
      }
    })
}

export const getPostData = async (id: string): Promise<PostData | undefined> => {
  const postsData = await getSortedPostsData()
  const post = postsData.find((post) => post.id === id)
  return post
}
