import { statSync, readdirSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

const createdRegex = /created: '1970-01-01T00:00:00\.000Z'/
const editedRegex = /edited: '1970-01-01T00:00:00\.000Z'/
const blogFolder = join(__dirname, 'content', 'blog')

const isFileTracked = (path: string) => execSync(`git ls-files ${path}`, { encoding: 'utf8' })

const run = async () => {
  try {
    const files = readdirSync(blogFolder)
      .map((p) => join(blogFolder, p))
      .filter((p) => statSync(p).isDirectory())
      .map((p) => join(p, 'index.md'))
      .filter(existsSync)
      .filter((p) => !!isFileTracked(p))

    const filesWithEmptyDates = files
      .map((p) => readFileSync(p, { encoding: 'utf8' }))
      .map((p, i) => (!!editedRegex.exec(p) || !!createdRegex.exec(p) ? files[i] : null))
      .filter((p) => p !== null)

    if (filesWithEmptyDates.length > 0) {
      throw new Error(
        `Posts without dates were encountered.
Files related are:

${filesWithEmptyDates.join('\n')}
`
      )
    }
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

try {
  run()
} catch (error) {
  console.error(error.message)
}
