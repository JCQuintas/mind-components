import { statSync, readdirSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

const createdRegex = /created: '1970-01-01T00:00:00\.000Z'/
const editedRegex = /edited: '1970-01-01T00:00:00\.000Z'/
const blogFolder = join(__dirname, 'content', 'blog')

const isFileTracked = (path: string) => execSync(`git ls-files ${path}`, { encoding: 'utf8' })

const run = async () => {
  readdirSync(blogFolder)
    .map(p => join(blogFolder, p))
    .filter(p => statSync(p).isDirectory())
    .map(p => join(p, 'index.md'))
    .filter(existsSync)
    .filter(p => !!isFileTracked(p))
    .map(p => readFileSync(p, { encoding: 'utf8' }))
    .forEach(p => {
      if (!!editedRegex.exec(p) || !!createdRegex.exec(p)) {
        process.exit(1)
      }
    })
}

try {
  run()
} catch (error) {
  console.log(error.message)
}
