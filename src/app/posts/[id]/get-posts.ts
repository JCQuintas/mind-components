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
}

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

export const getSortedPostsData = async () => {
  const fileNames = await readdir(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames.map(async (dirname) => {
      const id = dirname

      const fullPath = path.join(postsDirectory, `${id}/index.md`)
      const fileContents = await readFile(fullPath, 'utf8')

      const matterResult = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml', 'toml'])
        .process(fileContents)

      return {
        id,
        ...(matterResult.data as { date: string; title: string }),
      }
    })
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = async () => {
  const fileNames = await readdir(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export const getPostData = async (id: string): Promise<PostData> => {
  const fullPath = path.join(postsDirectory, `${id}/index.md`)
  const fileContents = await readFile(fullPath, 'utf8')

  const data = await unified()
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
    metadata: data.data.matter as PostData['metadata'],
    markdownContent: data.value.toString(),
  }
}
